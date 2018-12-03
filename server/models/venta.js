const mongoose = require('mongoose');
//Validador mensajes 
const uniqueValidator = require('mongoose-unique-validator');
const Producto = mongoose.model('Producto');

let Schema = mongoose.Schema;

let ventasSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: [true, "El id es necesario"]
    },
    fecha: {
        type: Date,
        required: [true, "La fecha es necesaria"]
    },
    hora: {
        type: String,
        required: [true, "La hora es necesaria"]

    },
    productos: [{
        type: String,
        ref: "Producto"
    }],
    total: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    },
    iva: {
        type: Number,
        default: 0
    },
    ventasState: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("Venta", ventasSchema);