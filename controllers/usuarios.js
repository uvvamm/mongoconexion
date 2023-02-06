const {response}= require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req,res) => {

    const numerodesdedondemostrara = Number ( req.query.numerodesdedondemostrara) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({},'nombre email role google img')
            .skip(numerodesdedondemostrara)
            .limit( 5 ),//limite por pagina
        Usuario.countDocuments()
    ])


        res.json( {
            ok: true,
            usuarios,
            total
            
        });
    
}


const crearUsuarios = async(req, res = response) => {
    
    const {email,password,nombre} = req.body;


    try {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            }) ;
        }

        const usuario = new Usuario(req.body);

        //encriptar contrsena
        const salt = bcrypt.genSaltSync();
        usuario.password =  bcrypt.hashSync(password, salt); 

        await usuario.save();
        const token = await  generarJWT(usuario.id);
    
        res.json( {
            ok: true,
            usuario,
            token
        }); 
    

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'error revizar logs'
        })
    } 

   
}

const actualizarUsuario = async(req,res = response) => {

    const uid = req.params.id;
    

     try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb){
            return res.status(404).json({
                ok: false,
                msg: 'no existe usuario'
            });
        }

        const { password,google,email, ...campos} = req.body;
        if(usuariodb.email !== email){
                 
            const existeEmail = await Usuario.findOne({ email });
        
             if(existeEmail){
                  return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                  });
             }
        }
        //actulizar
        campos.email = email;
        

        const usuarioActualizado  = await Usuario.findByIdAndUpdate(uid,campos,{new: true}); 
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


      
     }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg : 'error'
        })
     }


    
}


const deteleUsuarios = async(req,res) => {

    const uid = req.params.id;


    try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb){
            return res.status(404).json({
                ok: false,
                msg: 'no existe usuario'
            });
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: 'Usuario Eliminado',
            uid });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false, 
            msg : 'hable con el administrador'
    });
      
    
    }
}
module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    deteleUsuarios
}