const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/valida-jwt');

const { getUsuarios, crearUsuarios, actualizarUsuario,deteleUsuarios } = require('../controllers/usuarios');


/* manejo de usuarios  */
const router = Router();

 router.get('/',validarJwt,getUsuarios);
 
 
 router.post('/',
    /* middelware verificar la informacion  */
    [

        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('password','el password es obligatorio').not().isEmpty(),
        check('email','el email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios

  
 ,crearUsuarios);

 router.put('/:id',
 /* middelware verificar la informacion  */
 [

     validarJwt,
     check('nombre','el nombre es obligatorio').not().isEmpty(),
     check('email','el email es obligatorio').isEmail(),
     check('role','el role es obligatorio').not().isEmpty(), 
     validarCampos,
 ],actualizarUsuario);

 router.delete('/:id',validarJwt
 ,deteleUsuarios);

module.exports = router;  