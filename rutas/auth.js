const { Router } = require('express');
const {login, googleid, renewToken} = require('../controllers/auth');
const {validarJwt}= require('../middlewares/valida-jwt');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { borrarHospital } = require('../controllers/hospitales');

const router = Router();

/* ruta para login */

router.post('/', 
[
    check('password','el password es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    validarCampos,
],
login
)

router.post('/google', 
[
    check('token','el token de google es obligatorio').not().isEmpty(),
    validarCampos,
],
googleid
)

router.get('/renew', 
validarJwt,
renewToken
)




module.exports =router;