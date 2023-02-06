const {response}= require('express');
const Usuario = require('../models/Usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicoModelo');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const getTodosResultados = async(req,res = response) => {

    const valorBusqueda = req.params.valorBusqueda;//aqui se valida que el valor de la busqueda debe ser igual a lo que se envia desde la peticion(postman) algo asi http://localhost:3005/api/busquedas/sur
    const exprecionregularparabuscarlosresultados = RegExp(valorBusqueda,'i');

    
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario. find({ nombre: exprecionregularparabuscarlosresultados}),
        Medico. find({ nombre: exprecionregularparabuscarlosresultados }),
        Hospital. find( {nombre: exprecionregularparabuscarlosresultados})
    ])
    


        res.json( {
            ok: true,
            usuarios,
            medicos,
            hospitales
            
            
            
        });
    
}
const getColeccion = async(req,res = response) => {
    const tabla = req.params.tabla;
    const valorBusqueda = req.params.valorBusqueda;//aqui se valida que el valor de la busqueda debe ser igual a lo que se envia desde la peticion(postman) algo asi http://localhost:3005/api/busquedas/sur
    const exprecionregularparabuscarlosresultados = RegExp(valorBusqueda,'i');
    let data =[];


    switch (tabla) {
            case 'medicos':
                data = await Medico. find({ nombre: exprecionregularparabuscarlosresultados }) .populate('usuario', 'nombre, img') .populate('hospital', 'nombre, img');
            break;

            case 'hospitales':
                data = await Hospital. find({ nombre: exprecionregularparabuscarlosresultados }) .populate('usuario', 'nombre, img');
            break;

            case 'usuarios':
                data = await Usuario. find({ nombre: exprecionregularparabuscarlosresultados });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser valida'
            });
            
        }

      


        res.json( {
            ok: true,
            resultados :data
            
            
            
        });
    
}



module.exports = {
    getTodosResultados,
    getColeccion
}