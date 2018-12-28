// Constante que requiere el paquete de mongodb.
const mongoose = require('mongoose');
// Creamos una constante que será la encargada de crear la bdd.
const { Schema } = mongoose;

// Creamos las columnas que tendrá nuestra tabla empleado.
const EsquemaEmpleados = new Schema({
    nombre: {type: String, required: true },
    posicion: {type: String, required: true},
    oficina: {type: String, required: true},
    salario: {type: Number, required: true}
});

// Exportamos el módulo para que podamos acceder desde el controlador de nuestra bdd.
module.exports = mongoose.model('Empleado', EsquemaEmpleados);