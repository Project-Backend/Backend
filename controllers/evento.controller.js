const mongoose = require("mongoose");
const Evento = require("../models/Evento.model")



module.exports.evento = (req, res, next) => {
    res.render("evento");
}
module.exports.doEvento = (req, res, next) => {
const renderWithErros = (errors, values) => {
    res.render("evento", {errors, values} )
}
req.body.nivel = {
    desde: req.body.desde,
    hasta: req.body.hasta,
}
Evento.create(req.body)
.then(() => {
    res.redirect("/");
})
.catch((err) => {
    if(err instanceof mongoose.Error.ValidatorError){
        renderWithErros(err.errors, req.body)
    } else {
        next(err)
    }
})
}

