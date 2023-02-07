
/* ruta hospitales */

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/valida-jwt');

const { getHospitales,crearHospitales,actualizarHospital,borrarHospital } = require('../controllers/hospitales');


/* manejo de usuarios  */
const router = Router();

 router.get('/',getHospitales);
 
 
 router.post('/',
    /* middelware verificar la informacion  */
    [
      validarJwt,
      check('nombre','el nombre del hospital es necesario').not().isEmpty(),
      validarCampos
    ],
    crearHospitales);

 router.put('/:id',
 /* middelware verificar la informacion  */
 [
  validarJwt,
  check('nombre','el nombre del hospital es necesario').not().isEmpty(),
  validarCampos
 ],actualizarHospital);

 router.delete('/:id'
 ,borrarHospital);

module.exports = router;  