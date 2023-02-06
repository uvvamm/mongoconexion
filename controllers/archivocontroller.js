const {response}= require('express');
const { v4 : uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizardb');
const path = require('path');
const fs = require('fs');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicoModelo');
const Usuario = require('../models/Usuario');

const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const putArchivo = async(req,res = response) => {

    const tipo = req.params.tipo;//aqui se valida que el valor de la busqueda debe ser igual a lo que se envia desde la peticion(postman) algo asi http://localhost:3005/api/busquedas/sur
    const id = req.params.id;


    
    const tiposValidos= [ 'usuarios', 'medicos', 'hospitales' ];

        //
        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok: true,
                msg: 'no es medico , hospita,  o medico'
            });
        }
        //validar archivo
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).send('no se puede cargar por que no hay archivo');
        }

        //procesar imagen
        const file = req.files.imagen;
        
        const nombreCortado = file.name.split('.');
        const extencionArchivo = nombreCortado[ nombreCortado.length - 1];

        //validar extencion

        const extencionesValidas =['png','jpg','jpeg','gif'];
        if(!extencionesValidas.includes(extencionArchivo)){
            return res.status(400).json({
                ok: true,
                msg: 'no es extencion permitida'
            });
        }
        //generar nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

        //path para guardar la imagen
        const path =`./upload/${tipo}/${nombreArchivo}`;
        console.log(path);

        // mover imagen
        file.mv(path, (err) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    msg: 'error al mover la imagen'
                });
            }            
            

            //actualizar imagen

            actualizarImagen(tipo,id,nombreArchivo);

            res.json({
                ok:true,
                msg:'fileUpdate',
                nombreArchivo 
            }); 
        });
    
}

const retornaImg =( req, res = response) =>{
    const tipo = req.params.tipo;
    const img = req.params.avatar;

    const pathImg = path.join(__dirname, `../upload/${tipo}/${img}`);
    if (fs.existsSync(pathImg)){
        
        res.sendFile(pathImg);
    }else {
        const pathImg = path.join(__dirname, `../upload/289892267_104821045631804_3072183595224847638_n.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    putArchivo,
    retornaImg
}