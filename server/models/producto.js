const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    PrecioUni: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    disponibilidad: {
        type: Boolean,
        default: true,
        required: [true, 'La disponibilidad  es necesario']

    }

});
module.exports = mongoose.model('Produ', productoSchema);