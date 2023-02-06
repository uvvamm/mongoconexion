const { Router } = require('express');
const fileUpload  = require('express-fileupload');


const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/valida-jwt');

const { putArchivo,retornaImg } = require('../controllers/archivocontroller');


/* manejo de usuarios  */
const router = Router();
    router.use(fileUpload());

     router.put('/:tipo/:id',validarJwt,putArchivo);
     router.get('/:tipo/:avatar',validarJwt,retornaImg);
 
 

module.exports = router;   