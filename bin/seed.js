const mongoose = require('mongoose')
const Event = require('../models/Evento.model')
const eventsWithJSON = require('../data/events.json')

require('../config/db.config')


mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

       
        Promise.all(eventsWithJSON.map(event => {
            return Event.create(event);
        }))
            .then(createdEvents => {
                console.log("Events created successfully:", createdEvents);
                mongoose.disconnect(); 
            })
            .catch(error => {
                console.error("Error creating events:", error);
                mongoose.disconnect(); 
            });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });