const mongoose = require("mongoose");
const Evento = require("../models/Evento.model");
const { Router } = require("express");
const createHttpError = require("http-errors");
const Registrar = require("../models/Registrar.model")



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
    res.redirect("/eventos/list-eventos");
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
    /*const { provincia, ciudad, precio, nivel } = req.query;

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
    }*/

    Evento.find()
        .then(events => {
            res.render('eventos/list-eventos', { events });
        })
        .catch(err => next(err));
};

module.exports.getEventsId = (req, res, next) => {
    Evento.findById(req.params.id)
    .populate({path: "registros", populate: {path: "user", select: "username"}})
    .then(eventos => {
        if(!eventos) {
            next(createHttpError(404, 'Evento no encontrado'))
        }
        if(req.currentUser){
            Registrar.findOne({user: req.currentUser._id, evento: req.params.id})
            .then(registro => {
                if(registro){
                    res.render("eventos/detail", {eventos, registrado: Boolean(registro) })
                } else {
                    res.render("eventos/detail", {eventos})
                }
            })
        } else {res.render('eventos/detail', { eventos })
    }
        
    })
    .catch(err => next(err))    
}

//edit the event
module.exports.editEvent = (req, res, next) => {
    Evento
    .findById(req.params.id)
    .then(evento => {
        if(!evento) {
            next(createHttpError(404, 'Evento no encontrado'))
        } else {
            res.render("eventos/edit", {evento})
        }
    })
    .catch(err => next(err))
}

module.exports.doEditEvent = (req, res, next) => {
    Evento
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(evento => {
        if(!evento) {
            next(createHttpError(404, 'Evento no encontrado'))
        } else {
            res.redirect(`/eventos/${req.params.id}/detail`)
        }
    })
}

module.exports.deleteEvent = (req, res, next) => {
    Evento
    .findByIdAndDelete(req.params.id)
    .then(evento => {
        if(!evento) {
            next(createHttpError(404, 'Evento no encontrado'))
        } else {
            res.redirect("/eventos/list-eventos")
        }
    })
    .catch(err => next(err))
}