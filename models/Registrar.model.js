const mongoose = require("mongoose");
const User = require("./User.model")
const Event = require("./Evento.model")

const registrarSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evento",
        required: true,
    }
}
)

const Registrar = mongoose.model("Registrar", registrarSchema);

module.exports = Registrar