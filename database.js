const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Login_Register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});