// Constante que requiere el paquete de la base de datos.
const mongoose = require('mongoose');

// Constante que guarda la ruta de nuestro servidor de base de datos.
const URI = 'mongodb://localhost/mean-crud';

// Iniciamos la conexión con nuestra base de datos.
mongoose.connect(URI)
    .then(db => console.log('Se ha establecido la conexión con la base de datos.'))
    .catch(err => console.error(err));

// Exportamos la constante mongoose.
module.exports = mongoose;