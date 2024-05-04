const mongoose = require("mongoose");
const User = require("./User.model")
const Evento = require("./Evento.model")

const registrarSchema = mongoose.Schema(
{
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require: true,
    },
    evento: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Evento",
        require: true,
    }
}
)

const Registrar = mongoose.model("Registrar", registrarSchema);

module.exports = Registrar