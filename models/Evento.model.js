const mongoose = require("mongoose")
const REQUIRED_FIELD_ERROR = "Campo requerido"

const eventoSchema = (
    {
        deporte: { 
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
        duracion: {
            type: Number,
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
            required: [true, REQUIRED_FIELD_ERROR]
        },
        nivelDelPartido: {
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

    }

);

const Event = mongoose.model("Event", bookSchema);

module.exports = Event;