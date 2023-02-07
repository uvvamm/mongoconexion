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


const actualizarHospital =async( req, res = response )=>{
 
    
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(id);
        if(!hospital){
            return request.status(404).json({
                ok: true,
                msg: 'hospital no encontrado',
                id
            });
        }

        const cambiosHospital ={
            ...req.body,
             usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital,{new: true});


        res.json({
            ok: true,
            msg: 'agetHospitales',
            hospital : hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

const borrarHospital =async( req, res = response  )=>{

    const id = req.params.id;
    
    try {
        const hospital = await Hospital.findById(id);
        if(!hospital){
            return request.status(404).json({
                ok: true,
                msg: 'hospital no encontrado',
                id
            });
        }

        await Hospital.findByIdAndDelete(id);    


        res.json({
            ok: true,
            msg: 'hospital eliminado',
            
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
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospital
}