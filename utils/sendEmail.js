const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error('EMAIL_USER or EMAIL_APP_PASSWORD missing in .env');
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      connectionTimeout: 20000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"FoodBoard" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('OTP email sent successfully');
  } catch (error) {
    console.log('Email sending error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;