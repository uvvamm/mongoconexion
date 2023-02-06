const { response } = require('express');

const  Medico = require('../models/medicoModelo');

const getMedico =async( req, res  )=>{
    const medicos = await Medico.find().populate('usuario','nombre img').populate('hospital','nombre img');


    res.json( {
        ok: true,
        medicos
        
    });
  
}

const crearMedico = async( req, res =response  )=>{
    const uid = req.uid;
    const medico = new Medico({
        usuario : req.uid,
        ...req.body});
        console.log(uid,'asdada')
    try {

        const medicodb = await medico.save(); 
        res.json({
            ok: true,
            medico : medicodb 
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con un administrador'
        })
    }
}


const actualizarMedico =( req, res  )=>{
    res.json({
        ok: true,
        msg: 'agetHospitales'
    })
}

const borrarMedico =( req, res  )=>{
    res.json({
        ok: true,
        msg: 'bgetHospitales'
    })
}

module.exports = {  
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}