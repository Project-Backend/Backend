const mongoose = require("mongoose");
const Evento = require("../models/Evento.model")



module.exports.evento = (req, res, next) => {
    res.render("evento");
}