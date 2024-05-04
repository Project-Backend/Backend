const Registrar = require('../models/Registrar.model')

module.exports.doRegister = (req, res, next) => {

  Registrar.findOne({ user: req.currentUser._id, evento: req.params.id })
    .then((registro) => {
      if (registro) {
        // Si hay registro se borra
        return Registrar.findByIdAndDelete(registro._id)
          .then(res.redirect(`/eventos/${req.params.id}/detail`))
          //Si no lo hay, se crea el registro
      } else {
        return Registrar.create({ user: req.currentUser._id, evento: req.params.id })
          .then(res.redirect(`/eventos/${req.params.id}/detail`))
      }
    })
    .catch(err => next(err))
}
  
