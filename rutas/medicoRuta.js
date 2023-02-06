
/* ruta Medico */


const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/valida-jwt');

const { getMedico,crearMedico,actualizarMedico,borrarMedico } = require('../controllers/medicoControlador');


/* manejo de usuarios  */
const router = Router();

 router.get('/',getMedico);
 
 
 router.post('/',
    /* middelware verificar la informacion  */
    [
      validarJwt,
      check('nombre','el nombre del medico es necesario').not().isEmpty(),
      check('hospital','el nombre del hospital es necesario').isMongoId(),
      validarCampos
    ],
    crearMedico);

 router.put('/:id',
 /* middelware verificar la informacion  */
 [
 ],actualizarMedico);

 router.delete('/:id'
 ,borrarMedico);

module.exports = router;  