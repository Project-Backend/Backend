const mongoose = require('mongoose')
const User = require('../models/User.model')
const Registrar = require("../models/Registrar.model")
const Evento = require ("../models/Evento.model")


module.exports.login = (req, res, next) => {
    res.render('login')
}

module.exports.doLogin = (req, res, next) => {
    const LOGIN_ERROR_MESSAGE = "Email o contraseña incorrecto"

    const {email, password} = req.body

    const renderWithErrors = (error, values) => {
        res.render("login", {error, values})
    }

    if (!password || !email){
        renderWithErrors("Campos incompletos", {email})
    }

    User.findOne({email})
    .then((user) => {
        if(user){
            return user.checkPassword(password)
            .then((match) => {
                if(match){
                    req.session.userId = user._id; // aqui se le pasa el id del usuario a la sesion
                    res.redirect("/");
                } else {
                    renderWithErrors(LOGIN_ERROR_MESSAGE,{email})
                }

            })
        } else {
            renderWithErrors(LOGIN_ERROR_MESSAGE, {email})
        }
    })
    .catch(err => next(err))
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login")
}

// module.exports.getCurrentUserProfile = (req, res, next) => {
//     console.log(req.currentUser._id)
// Registrar.find({user: req.currentUser._id})
// .populate("evento")// es el nombre del campo evento en el modelo registrar, no el ref
// .then(registros => {
//     res.render("profile", {eventos: registros.map(registro => registro.evento) });
// })
// .catch(err => next(err))
// }

module.exports.getCurrentUserProfile = (req, res, next) => {
    Registrar
    .find({ user: req.currentUser._id })
    .populate("evento")
    .then(registros => {
        const eventos = registros
        .filter(registro => registro.evento !== null)
        .map(registro => registro.evento)

        res.render("profile", { eventos })
    })
    .catch(err => next(err))

}

