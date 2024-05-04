const mongoose = require("mongoose")
const REQUIRED_FIELD_ERROR = "Campo requerido"
const User = require("./User.model");
const Registrar = require("./Registrar.model")
const eventoSchema = new mongoose.Schema(
    {
        nombreDelDeporte: { 
        type: String,
        required: [true, REQUIRED_FIELD_ERROR]
    },
        provincia: {
            type: String,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        ciudad: {
            type: String,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        lugarDelPartido: {
            type: String,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        fechaYHoraDelPartido: {
            type: Date,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        tiempoDeInscripcion: {
            type: Date,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        duracionDelPartido: {
            type: String,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        numeroDeJugadores: {
            type: Number,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        precioPorPersona: {
            type: Number,
            required: [true, REQUIRED_FIELD_ERROR]
        },
        sexo: {
            type: String,
            enum: ["Masculino", "Femenino", "Mixto"],
            default: "Mixto",
            required: [true, REQUIRED_FIELD_ERROR],
        },
        nivel: {
            type: Object,
            required: [true, REQUIRED_FIELD_ERROR],
            desde : {
                type: String,
                enum: ["Iniciación", "Principiante", "Medio", "Avanzado"],
                required: [true, REQUIRED_FIELD_ERROR],
            },
            hasta: {
                type: String,
                enum: ["Iniciación", "Principiante", "Medio", "Avanzado"],
                required: [true, REQUIRED_FIELD_ERROR]

            }
        },
        normas: {
            type: String,
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }

);

eventoSchema.virtual("registros", {
    ref: "Registrar",
    foreignField: "Event",
    localField: "_id",
    justOne: false,
})


const Event = mongoose.model("Event", eventoSchema);

module.exports = Event;