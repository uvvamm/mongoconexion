const { response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googl-verify');


const login = async (req, res = response) => {

    const {email,password} = req.body;

    try {
        /* valida email */
        const usuarioverificaemail = await Usuario.findOne({email});
        if (!usuarioverificaemail){
            return res.status(404).json({
                ok: false,
                message: 'credenciales no validas'
        })
    }
        /* valida contrsena */

        const validaPassword = bcrypt.compareSync(password, usuarioverificaemail.password);
        if (!validaPassword ){
            return res.status(404).json({
                ok: false,
                msg:'contrasena no valida'
        });

    }
    const token = await  generarJWT(usuarioverificaemail.id);
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administradior'
    })

    }
}
const googleid = async (req, res = response) => {

    try {
    const {email, name , picture} = await googleVerify(req.body.token);
    const usuarioDB = await Usuario.findOne({email});
    let usuario;

    if (!usuarioDB){
        usuario = new Usuario({
            nombre : name,
            email: email,
            password: '@@@',
            img: picture,
            google : true
        })
    }else{
        usuario = usuarioDB;
        usuario.google= true;


    }
    await usuario.save();

    const token =await generarJWT(usuario.id)
    
      res.json({
        ok: true,
        email, name , picture,
        token
      })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administradior'
    })

    }
}

module.exports ={
    login,
    googleid
}