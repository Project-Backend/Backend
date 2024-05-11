
require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const hbs = require('hbs')
const path = require('path')

const session = require('./config/session.config');
const routes = require('./config/routes.config');

require('./config/db.config');

// Instanciamos express
const app = express();

// Midlewares
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

hbs.registerHelper('formatDate', function(date) {
    // Lógica para formatear la fecha
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).replace(/\//g, '-');
});

app.use(session.sessionConfig);
app.use(session.getCurrentCurrentUser);

// Routes
app.use(routes);

app.listen(3000, () => {
    console.log('App running at port 3000')
});
