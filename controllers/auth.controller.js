const mongoose = require('mongoose')
const User = require('../models/User.model')


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