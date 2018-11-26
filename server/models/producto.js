const mongoose = require('mongoose');
//Validador mensajes 
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let productosSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    precioVenta: {
        type: String,
        required: [true, "El precio de Venta es necesario"]
    },
    precioCompra: {
        type: String,
        required: [true, "El precio de Compra es necesaria"]
    },
    existencia: {
        type: String,
        default: 0,
        required: [true, "La existencia es necesaria"],
    },
    descripcion: {
        type: String
    },

    img: {
        type: String
    },
    prodState: {
        type: Boolean,
        default: true
    },
})



module.exports = mongoose.model("Producto", productosSchema);