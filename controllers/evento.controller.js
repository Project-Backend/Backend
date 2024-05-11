const mongoose = require("mongoose");
const Evento = require("../models/Evento.model");
const { Router } = require("express");
const createHttpError = require("http-errors");
const Registrar = require("../models/Registrar.model");
const multer = require("../config/storage.config")


// ver vista evento
module.exports.evento = (req, res, next) => {
    res.render("evento");
}
//crear evento
module.exports.doEvento = (req, res, next) => {
    console.log(req.body, "se manda vacio");
const renderWithErros = (errors, values) => {
    res.render("evento", {errors, values} )
}
if(req.file){
    req.body.imgUrl = req.file.path //se pasa imgUrl(del modelo evento) al body, para que luego el create de req.body tenga acceso al archivo
}
req.body.nivel = {
    desde: req.body.desde,
    hasta: req.body.hasta,
}
req.body.usuario = req.currentUser._id //necesitas hacer esto cuando creas un usuario en el modelo evento,para darle un propietario. En este caso se llama usuario
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
// ver eventos creados
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
//ver detalles eventos
module.exports.getEventsId = (req, res, next) => {
    Evento.findById(req.params.id)
    .populate({path: "registros", populate: {path: "user", select: "username imgUrl"}})
    .populate("usuario")
    .then(event => {
        if(!event) {
            next(createHttpError(404, 'Evento no encontrado'))
        }
        console.log("Evento encontrado:", event);
        console.log("Número de jugadores permitidos:", event.registros.length);
        if (event.registros.length >= event.numeroDeJugadores){
            res.render("eventos/detail", {event, registroCerrado: true})
            return
        }
        if(req.currentUser){
            Registrar.findOne({user: req.currentUser._id, evento: req.params.id})
            .then(registro => {
                if(registro){
                    res.render("eventos/detail", {event, registrado: Boolean(registro) })
                } else {
                    res.render("eventos/detail", {event})
                }
            })
        } else {res.render('eventos/detail', { event })
    }
        
    })
    .catch(err => next(err))    
}




module.exports.editEvent = (req, res, next) => {
    Evento
    .findById(req.params.id)
        .then(evento => {
            if (!evento) {
                next(createHttpError(404, 'Evento no encontrado'));
            } else {
                res.render('eventos/edit', { evento });
            }
        })
        .catch(err => next(err));
};

module.exports.doEditEvent = (req, res, next) => {
    Evento
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(event => {
            if (!event) {
                next(createHttpError(404, 'Evento no encontrado'));
            } else {
                res.redirect(`/profile`);
            }
        })
        .catch(err => next(err));
}


// delete the event
module.exports.deleteEvent = (req, res, next) => {
    Evento
    .findByIdAndDelete(req.params.id)
        .then(event => {
            if (!event) {
                next(createHttpError(404, 'Evento no encontrado'));
            } else {
                res.redirect(`/profile`);
            }
        })
        .catch(err => next(err));
}
