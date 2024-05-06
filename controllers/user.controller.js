const mongoose = require('mongoose');
const User = require('../models/User.model');
const multer = require("../config/storage.config");

module.exports.register = (req, res, next) => {
    res.render('register')
}

module.exports.doRegister = (req, res, next) => {
    const renderWithErrors = (errors, values) => {
      res.render('register', { errors, values })
    }
    if(req.file){
      req.body.imgUrl = req.file.path //se pasa imgUrl(del modelo user) al body, para que luego el create de req.body tenga acceso al archivo
    }
  
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






 
