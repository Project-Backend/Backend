const mongoose = require('mongoose')
const User = require('../models/User.model')

module.exports.register = (req, res, next) => {
    res.render('register')
}

module.exports.doRegister = (req, res, next) => {
    const renderWithErrors = (errors, values) => {
      res.render('register', { errors, values })
    }
    console.log('req.body', req.body)
  
    User.create(req.body)
      .then(() => {
        res.redirect('/login');
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors, req.body)
        } else { 
          next(err)
        }
      })
  }

  module.exports.login = (req, res, next) => {
    res.render('login')
}
  




 
