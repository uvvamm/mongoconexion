const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dbConnection = async () => {

    try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('on line');
} catch (error) {
    console.error(error);
    throw new Error('Error connecting to Mongoose Db');
}
}
module.exports = {
    dbConnection
}      