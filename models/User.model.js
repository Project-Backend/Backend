const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Registrar = require("./Registrar.model")

const SALT_ROUNDS = 10

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password : {
            type: String,
            required: true,
            minlength : [3, "Password must be atleast 3 characters long"]
        },

        imgUrl: {
            type: String
        }
    }
);

userSchema.virtual("registros", { //Se define un campo virtual "registros" en el userSchema
    ref: "Registrar",
    foreignField: "user", //En el modelo registro se va a usar el campo user para establecer relacion con el modelo Like
    localField: "_id", //En el modelo usuario que se va a usar para establecer relacion con el modelo Like
    justOne: false, //Con false, el mismo usuario se puede registrar en varios eventos
})

userSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password)
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash;
                next()
            })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User