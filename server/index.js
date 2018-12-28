// Constante que requiere del paquete express.
// (Se almacena en una constante para poder reutilizar el paquete.)
const express = require('express');

// Constante que requiere del paquete morgan.
const morgan = require('morgan');

// Constante que inicializa express.
const app = express();

// Constante que requiere del paquete cors.
// Dicha constante se encarga de entablar conexiones entre el middleware y el backend.
const cors = require('cors');

// Constante que guarda la ruta de nuestra base de datos (mongoose es el paquete de mongodb.)
const { mongoose } = require('./database');

// Configuraciones
/**
 * params: process.env.PORT = puerto que nos deje el sistema.
 * En caso de no tener ningún puerto disponible se pondrá el 3000 por defecto.
 */
app.set('port', process.env.PORT || 3000);

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Rutas
/**
 * params: El archivo de enrutado será el fichero empleado.routes.js
 */
app.use('/api/empleado',require('./routes/empleado.routes'));


// Iniciar la escucha del servidor
app.listen(app.get('port'), () =>{
    console.log('Servidor escuchando en puerto ', app.get('port'));
});