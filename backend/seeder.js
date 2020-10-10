const mongoose = require('mongoose');
const connectDB = require('./config/db');
const colors = require('colors');

const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const products = require('./data/products');
const users = require('./data/users');

connectDB();

const importData = async () => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();


        const usersInserted = await User.insertMany(users);

        const sampleProducts = products.map(prod => {
            return {...prod, user: usersInserted[0]._id};//le asignamos los productos al admin por ejemplo
        });

        await Product.insertMany(sampleProducts);
        console.log("Products inserted".green.inverse);
        process.exit();
    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(-1);
    }
};

const destroyData = async () => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        process.exit();
    }catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(-1);
    }
};


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}

