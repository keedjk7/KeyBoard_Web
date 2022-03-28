const express = require('express');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
  next();
};

router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Keyboard Web', user: req.session.user });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;