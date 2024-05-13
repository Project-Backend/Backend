const router = require('express').Router()
const multer = require("./storage.config")

const userController = require('../controllers/user.controller')
const eventoController = require("../controllers/evento.controller")
const authController = require("../controllers/auth.controller")
const registrarController = require("../controllers/registrar.controller")

const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', (req, res, next) => res.render('home'))

router.get("/register", authMiddleware.isNotAuthenticated, userController.register)
router.post("/register", authMiddleware.isNotAuthenticated, multer.single("imgUrl"), userController.doRegister)
router.get("/login",authMiddleware.isNotAuthenticated, authController.login)
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin)
router.get("/logout", authMiddleware.isAuthenticated, authController.logout)
router.get("/crearEvento", authMiddleware.isAuthenticated, eventoController.evento);
router.post("/crearEvento", authMiddleware.isAuthenticated, multer.single("imgUrl"),eventoController.doEvento)
router.get("/profile", authMiddleware.isAuthenticated, authController.getCurrentUserProfile)
router.get("/usuario/:userId", authMiddleware.isAuthenticated, userController.getUserDetails)
router.post("/usuario/:userId/comentarios", authMiddleware.isAuthenticated, userController.createComment)


//eventos


router.get("/eventos/list-eventos", eventoController.getEvents)
router.get("/eventos/:id/detail", authMiddleware.isAuthenticated, eventoController.getEventsId)
router.post("/eventos/:id/registrar", authMiddleware.isAuthenticated, registrarController.doRegister)
router.get("/eventos/:id/edit", authMiddleware.isAuthenticated, eventoController.editEvent)
router.post("/eventos/:id/edit", authMiddleware.isAuthenticated, eventoController.doEditEvent)
router.get("/eventos/:id/delete", authMiddleware.isAuthenticated, eventoController.deleteEvent)

module.exports =  router
