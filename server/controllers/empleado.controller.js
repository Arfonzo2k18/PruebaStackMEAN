// Constante que requiere el modelo de empleados para posteriormente
// poder manipular los datos en nuestra base de datos.
const Empleado = require('../models/empleado');

// Creamos una constante para utilizarla como controlador de nuestra bdd.
const empleadoControlador = {};


/**
 * params: req = Argumento de solicitud HTTP a la función de middleware.
 *         res = Argumento de respuesta HTTP a la función de middleware.
 */
// Consulta que nos trae todos los empleados de nuestra bdd. (GET)
empleadoControlador.getEmpleados = async (req, res) => {
// El await en este caso se encarga de esperar a que la bdd retorne un resultado de la consulta.
// Una vez retorne un resultado la consulta, la función asíncrona puede continuar.
   const empleados = await Empleado.find();

// Muestra la respuesta en un json.
   res.json(empleados);
};

// Método para crear un empleado. (POST)
empleadoControlador.createEmpleado = async (req, res) => {
/**
 * params: req.body = Argumento que se encarga de introducir todos los datos especificados
 * en el constructor del objeto. En este caso; nombre, posicion, oficina, salario.
 */
const empleado = new Empleado({
    nombre: req.body.nombre,
    posicion: req.body.posicion,
    oficina: req.body.oficina,
    salario: req.body.salario
});

// El await en este caso se encarga de esperar a que la base de datos haya introducido el nuevo empleado.
    await empleado.save();

// Mensaje en un json.
    res.json({
       'status': 'Empleado creado correctamente.' 
    });
};

// Método para buscar un empleado por ID. (GET)
empleadoControlador.getEmpleado = async (req, res) => {
    try {
    // El await en este caso se encarga de esperar a que la base de datos haya encontrado un empleado por id.
    // Dicho id está especificado en la URL de nuestro navegador. Por ejemplo si buscamos al empleado con id 1,
    // nuestra url sería http://localhost:3000/api/empleado/1
    const empleado = await Empleado.findById(req.params.id);

    // Si lo encuentra manda un código de respuesta 200.
    res.status(200).json({
        Success: true,
        Empleado: empleado
    })
    // Si falla manda un mensaje de error y un código de respuesta 400.
    } catch(error){
        return res.status(404).json({
            Success: false,
            errors: {
                error: error,
                message: 'No se ha encontrado ningun empleado con el ID " + req.params.id + "'
            }
        })
    }
};

// Método para editar los datos de un empleado. (PUT)
empleadoControlador.editEmpleado = async (req, res) => {
// Creamos una constante que será el id que vendrá de nuestra URL
    const { id } = req.params;

// Creamos una constante que contendrá los datos del empleado que vamos a modificar, excepto el id.
    const empleado = {
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        oficina: req.body.oficina,
        salario: req.body.salario
    }

    try{
    // Buscamos el empleado por id y modificados los datos por los del objeto empleado que hemos creado antes.
    // Esperamos a que la bdd actualice los datos y seguimos con la función asíncrona.
    await Empleado.findByIdAndUpdate(id, {$set: empleado}, {upsert: true});
    res.json({status: 'Empleado actualizado correctamente.'});
    } catch(error) {
        // Si no existe dicho empleado, mandamos un código de error 404 y mostramos un mensaje de error.
        return res.status(404).json({
            Success: false,
            errors: {
                error: error,
                message: 'No se ha encontrado ningun empleado con el ID' + req.params.id + '.'
            }
        })
    }
};

// Método para eliminar un empleado. (DELETE)
empleadoControlador.delEmpleado = async (req, res) => {
    try{
        // Buscamos un empleado por id y lo eliminamos.
        await Empleado.findByIdAndRemove(req.params.id);
        res.json({status: 'Empleado eliminado correctamente.'});
    } catch(error) {
        // Si no existe dicho empleado, mandamos un código de error 404 y mostramos un mensaje de error.
        return res.status(404).json({
            Success: false,
            errors: {
                error: error,
                message: 'No se ha encontrado ningun empleado con el ID' + req.params.id + '.'
            }
        })
    }
}
// Exportamos el módulo controlador de empleados.
module.exports = empleadoControlador;