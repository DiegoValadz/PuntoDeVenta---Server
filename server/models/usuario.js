const mongoose = require('mongoose');
//Validador mensajes 
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ["Administrador", "Vendedor", "Cliente"],
    message: '{VALUE} no es un tipo de usuario valido'
}

let usuarioSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, "El id es necesario"]

    },
    /* ID_USER: {
         type: String,
         unique: true,
         required: [true, "El id es necesario"]
     }*/
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    usuario: {
        type: String,
        unique: true,
        required: [true, "El usuario es necesario"]
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    tipo: {
        type: String,
        default: "USER_ROLE",
        required: [true, "La tipo de usuario es necesario"],
        enum: rolesValidos
    },
    direccion: {
        default: "",
        type: String
    },
    ciudad: {
        default: "",
        type: String
    },
    estado: {
        default: "",
        type: String
    },
    cp: {
        default: "",
        type: String
    },
    telefono: {
        default: "",
        type: String
    },
    email: {
        default: "",
        type: String
    },
    img: {
        default: "",
        type: String
    },
    userState: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});
/*
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contraseña;

    return userObject;
}*/

usuarioSchema.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser unico'
});

module.exports = mongoose.model("Usuario", usuarioSchema);