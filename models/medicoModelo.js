const { Schema, model, SchemaTypeOptions } = require('mongoose');

const medicoSchema = Schema({
    nombre: {
        type: String,
        required:true,        
    },
    img: {
        type:String,
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }},
    /* esto define la tabla en mongo */
    { collection : 'medicos' }

);

medicoSchema.method('toJSON', function()  {
  const {__v ,  ...object }= this.toObject();
  return object;
})


module.exports = model('Medico',medicoSchema);