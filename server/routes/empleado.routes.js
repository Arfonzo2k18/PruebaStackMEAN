const express = require('express');
const router = express.Router();

// Constante que guarda el path del fichero controlador de base de datos.
const empleado = require('../controllers/empleado.controller');

// Enrutamientos para las diferentes acciones con la base de datos.
/**
 * params: get = recoger
 *         post = publicar/subir
 *         put = superponer/sobreescribir (se usa en los updates)
 *         delete = eliminar
 */
router.get('/', empleado.getEmpleados);
router.post('/', empleado.createEmpleado);
router.get('/:id', empleado.getEmpleado);
router.put('/:id', empleado.editEmpleado);
router.delete('/:id', empleado.delEmpleado);

// Exportamos el módulo para poder utilizarlo en otros 
module.exports = router;