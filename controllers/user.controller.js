const mongoose = require('mongoose')
const User = require('../models/User.model')

module.exports.register = (req, res, next) => {
    res.render('register')
}