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


const actualizarMedico =async( req, res = response  )=>{
     
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Medico.findById(id);
        if(!hospital){
            return request.status(404).json({
                ok: true,
                msg: 'hospital no encontrado',
                id
            });
        }

        const cambiosMedico ={
            ...req.body,
             usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico,{new: true});


        res.json({
            ok: true,
            msg: 'medico actualizado',
            medico : medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const borrarMedico =async( req, res = response  )=>{
    const id = req.params.id;
    
    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return request.status(404).json({
                ok: true,
                msg: 'medico no encontrado',
                id
            });
        }

        await Medico.findByIdAndDelete(id);    

        res.json({
            ok: true,
            msg: 'Medico eliminado',
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {  
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}