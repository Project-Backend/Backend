const mongoose = require('mongoose')
const Event = require('../models/Evento.model')
const eventsWithJSON = require('../data/events.json')

require('../config/db.config');

mongoose.connection.once('open', () => {

    mongoose.connection.dropCollection('events')
    .then(() => {
        console.log('database cleared')

        return Event.create(eventsWithJSON)
    })

    .then(newEvents => {
        newEvents.forEach((event) => {
            console.log(`${event.nombreDelDeporte} has been created`)
        })
        console.log(`${newEvents.length} events have been created`);
    })
    .catch(err => console.error(err))
    .finally(() => {
        mongoose.connection.close()
            .then(() => console.log('Connection closed'))
            .catch(err => console.log('Error disconnectiong:', err))
            .finally(() => process.exit(0))
    })

})