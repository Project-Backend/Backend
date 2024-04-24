const router = require('express').Router()

const userController = require('../controllers/user.controller')


//const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res, next) => res.render('home'))

router.get("/register")


router.get("/crearEvento", userController.evento);


module.exports = router