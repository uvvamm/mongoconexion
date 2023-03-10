require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./config');

//SERVIDOR O HOST
const app = express();

//BLOQUEO DE CONEXION A SERVIDOR
const cors = require('cors');

app.use(cors());
//carpeta publication           
app.use(express.static('public'));

/* parseodel body */
app.use( express.json());


//conexion a mongo
dbConnection();



app.use('/api/usuarios',require('./rutas/usuarios'));
app.use('/api/login',require('./rutas/auth'));
app.use('/api/google',require('./rutas/auth'));
app.use('/api/hospitales',require('./rutas/hospitales'));
app.use('/api/medicos',require('./rutas/medicoRuta'));
app.use('/api/busquedas',require('./rutas/busquedas'));
app.use('/api/archivos',require('./rutas/cargadearchivos'));

app.listen( process.env.PORT, () => {
        console.log('listening on port '+process.env.PORT);
}); 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect = "mongodb+srv://uvvamm:DztldIOpy1itU9VC@cluster0.xrymmqg.mongodb.net/test";


