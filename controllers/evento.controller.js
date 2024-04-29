const mongoose = require("mongoose");
const Evento = require("../models/Evento.model");
const { Router } = require("express");
const createHttpError = require("http-errors");



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

module.exports.getEvents = (req, res, next) => {
    const { provincia, ciudad, precio, nivel } = req.query;

    const query = {};

    if (provincia) {
        query.provincia = provincia;
    }

    if (ciudad) {
        query.ciudad = ciudad;
    }

    if (precio) {
        query.precioPorPersona = precio;
    }

    if (nivel) {
        query['nivel.desde'] = nivel;
    }

    Evento.find(query)
        .then(events => {
            res.render('eventos/list-eventos', { events });
        })
        .catch(err => next(err));
};

module.exports.getEventsId = (req, res, next) => {
    Evento
    .findById(req.params.id)
    .then(eventos => {
        if(!eventos) {
            next(createHttpError(404, 'Evento no encontrado'))
        }
        res.render('eventos/detail', { eventos })
    })
    .catch(err => next(err))    
}



