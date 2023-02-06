const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/valida-jwt');

const { getTodosResultados,getColeccion } = require('../controllers/busquedasController');


/* manejo de usuarios  */
const router = Router();

 router.get('/:valorBusqueda',//aqui se asigna la varible de la peticion(postman) algo asi http://localhost:3005/api/busquedas/sur
 validarJwt,getTodosResultados);

 router.get('/coleccion/:tabla/:valorBusqueda',//aqui se asigna la varible de la peticion(postman) algo asi http://localhost:3005/api/busquedas/sur
 validarJwt,getColeccion);
 
 


module.exports = router;  