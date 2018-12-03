const mongoose = require('mongoose');
//Validador mensajes 
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let productosSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, "El id es necesario"]

    },
    /* ID_PROD: {
         type: String,
         unique: true,
         // required: [true, "El id es necesario"]

     },*/

    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    precioVenta: {
        type: Number,
        default: 0,
        required: [true, "El precio de Venta es necesario"]
    },
    precioCompra: {
        type: Number,
        default: 0,
        required: [true, "El precio de Compra es necesaria"]
    },
    existencia: {
        type: Number,
        default: 0,
        required: [true, "La existencia es necesaria"],
    },
    descripcion: {
        default: "",
        type: String
    },

    img: {
        default: "",
        type: String
    },
    prodState: {
        type: Boolean,
        default: true
    },
})

productosSchema.plugin(uniqueValidator, {
    message: 'El {PATH} debe de ser unico'
});


module.exports = mongoose.model("Producto", productosSchema);