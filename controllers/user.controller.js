const mongoose = require('mongoose')
const User = require('../models/User.model')

module.exports.register = (req, res, next) => {
    res.render('register')
}

module.exports.doegister = (req, res, next) => {
    const renderWithErros = (errors, values) => {
        res.render("register", {errors, values})
    }

    User.create(req.body)
}

