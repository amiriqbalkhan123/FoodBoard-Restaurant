const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const generateOtp = require('../utils/generateOtp');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    if (!req.user.isVerified) {
      return res.redirect('/verify-otp');
    }

    return res.redirect('/dashboard');
  }

  res.redirect('/login');
});

router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }

  res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.send('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpCode = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      otpCode,
      otpExpires,
    });

    await sendEmail({
      to: email,
      subject: 'FoodBoard Email Verification Code',
      html: `
        <div style="font-family: Arial; padding: 24px;">
          <h2>Welcome to FoodBoard</h2>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing: 6px; color: #f97316;">${otpCode}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    });

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect('/verify-otp');
    });
  } catch (error) {
    console.log(error);
    res.send('Registration failed. Check email settings.');
  }
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    if (!req.user.isVerified) {
      return res.redirect('/verify-otp');
    }

    return res.redirect('/dashboard');
  }

  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      if (!user.isVerified) {
        return res.redirect('/verify-otp');
      }

      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.get('/verify-otp', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  if (req.user.isVerified) {
    return res.redirect('/dashboard');
  }

  res.render('auth/verify-otp');
});

router.post('/verify-otp', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }

    const { otpCode } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.redirect('/login');
    }

    if (!user.otpCode || !user.otpExpires) {
      return res.send('No OTP found. Please request a new code.');
    }

    if (user.otpExpires < Date.now()) {
      return res.send('OTP expired. Please request a new code.');
    }

    if (user.otpCode !== otpCode) {
      return res.send('Invalid OTP code.');
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpires = null;

    await user.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.send('OTP verification failed.');
  }
});

router.post('/resend-otp', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.redirect('/login');
    }

    if (user.isVerified) {
      return res.redirect('/dashboard');
    }

    const otpCode = generateOtp();

    user.otpCode = otpCode;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Your New FoodBoard OTP Code',
      html: `
        <div style="font-family: Arial; padding: 24px;">
          <h2>FoodBoard Verification</h2>
          <p>Your new OTP code is:</p>
          <h1 style="letter-spacing: 6px; color: #f97316;">${otpCode}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    });

    res.redirect('/verify-otp');
  } catch (error) {
    console.log(error);
    res.send('Could not resend OTP.');
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/login');
  });
});

module.exports = router;