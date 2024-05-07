const router = require('express').Router()
const multer = require("./storage.config")

const userController = require('../controllers/user.controller')
const eventoController = require("../controllers/evento.controller")
const authController = require("../controllers/auth.controller")
const registrarController = require("../controllers/registrar.controller")

//const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res, next) => res.render('home'))

router.get("/register", userController.register)
router.post("/register", multer.single("imgUrl"), userController.doRegister)
router.get("/login", authController.login)
router.post("/login", authController.doLogin)
router.get("/logout", authController.logout)
router.get("/crearEvento", eventoController.evento);
router.post("/crearEvento", eventoController.doEvento)
router.get("/profile", authController.getCurrentUserProfile)


//eventos


router.get("/eventos/list-eventos", eventoController.getEvents)
router.get("/eventos/:id/detail", eventoController.getEventsId)
router.post("/eventos/:id/registrar", registrarController.doRegister)
router.get("/eventos/:id/edit", eventoController.editEvent)
router.post("/eventos/:id/edit", eventoController.doEditEvent)
module.exports =  router
