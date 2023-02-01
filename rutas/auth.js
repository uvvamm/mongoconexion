const { Router } = require('express');
const {login} = require('../controllers/auth');

const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

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


module.exports =router;