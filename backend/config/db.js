const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGOOSE_CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        
        console.log(`Connected to mongoose host: ${conn.connection.host}`);
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;