const { response } = require('express');

const  Hospital = require('../models/hospital');

const getHospitales =async( req, res  )=>{
    const hospitales = await Hospital.find().populate('usuario','nombre img');


    res.json( {
        ok: true,
        hospitales
        
    });
}

const crearHospitales = async( req, res = response  )=>{
    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario : req.uid,
        ...req.body});
        console.log(uid,'asdada')
    try {

        const hospitaldb = await hospital.save(); 
        res.json({
            ok: true,
            hospital : hospitaldb 
        });    
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'hable con un administrador'
        })
    }

    
}


const actualizarHospital =( req, res  )=>{
    res.json({
        ok: true,
        msg: 'agetHospitales'
    })
}

const borrarHospital =( req, res  )=>{
    res.json({
        ok: true,
        msg: 'bgetHospitales'
    })
}

module.exports = {  
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospital
}