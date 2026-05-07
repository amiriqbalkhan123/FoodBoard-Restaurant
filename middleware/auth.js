module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  },

  ensureVerified: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isVerified) {
      return next();
    }

    if (req.isAuthenticated()) {
      return res.redirect('/verify-otp');
    }

    res.redirect('/login');
  },
};