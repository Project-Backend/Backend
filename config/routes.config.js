const router = require('express').Router()

const userController = require('../controllers/user.controller')
const eventoController = require("../controllers/evento.controller")


//const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res, next) => res.render('home'))

router.get("/register")


router.get("/crearEvento", eventoController.evento);
router.post("/crearEvento", eventoController.doEvento)


//eventos
module.exports =  router
