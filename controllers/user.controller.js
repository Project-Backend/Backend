const mongoose = require('mongoose');
const User = require('../models/User.model');
const multer = require("../config/storage.config");
const Comment = require("../models/Comment.model")

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

  module.exports.getUserDetails = (req, res, next) => {
    console.log("User ID:", req.params.userId);
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }
            // Lógica para cargar los comentarios asociados al usuario
            Comment.find({ user: user._id })
            .populate('sender', ['username', 'imgUrl']) //se le pasa user, porque asi se llama en mi modelo comment, y se le pasa las propiedadades que quiera del modelo user
                .then(comments => {
                    // Renderizar la vista de detalles del usuario junto con los comentarios
                    res.render('userDetails', { user, comments, canComment: user._id.toString() !== req.currentUser._id.toString() });
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

module.exports.createComment = (req, res, next) => {
  const userId = req.params.userId;
  const { commentText, commentTitle } = req.body; // Suponiendo que solo recibes el texto del comentario desde el cuerpo de la solicitud

  if (req.currentUser._id.toString() === userId) {
    return res.status(400).send('No puedes comentar en tu propio perfil');
  }
  // Primero, verifica si el usuario al que se está comentando existe
  User.findById(userId)
      .then(user => {
          if (!user) {
              return res.status(404).send('Usuario no encontrado');
          }

          // Crea el comentario solo para el usuario
          Comment.create({
              user: userId,
              comment: commentText,
              title: commentTitle,
              sender: req.currentUser._id
          })
          .then(comment => {
              res.redirect(`/usuario/${userId}`);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
};






 
