require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./config');

//SERVIDOR O HOST
const app = express();

//BLOQUEO DE CONEXION A SERVIDOR
const cors = require('cors');

app.use(cors());

dbConnection();

app.get('/', (req,res) => {
        res.json( {
                ok: true,
                msg:'hola mundo' 
        });
});

app.listen( process.env.PORT, () => {
        console.log('listening on port '+process.env.PORT);
}); 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect = "mongodb+srv://uvvamm:DztldIOpy1itU9VC@cluster0.xrymmqg.mongodb.net/test";


