const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;

    if (!name || !username || !password) {
        return res.render('register', { message: 'Please try again' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        username,
        password: passwordHash
    });
    await user.save();

    res.render('index', { user });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.render('register', { message: 'Please try again' });
    }
  
    const user = await User.findOne({
      username
    });
  
    if (user) {
      const isCorrect = bcrypt.compareSync(password, user.password);
  
      if (isCorrect) {
        req.session.user = user;
        return res.render('index', { user });
      } else {
        return res.render('login', { message: 'Username or Password incorrect' });
      }
    } else {
      return res.render('login', { message: 'Username does not exist.' });
    }
  });
  

module.exports = router;