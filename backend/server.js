const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const products = require('./products');

const port = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(cors());

app.get("/api/products", (req,res) => {
    res.json(products);
});

app.get("/api/products/:id", (req,res) => {
    res.json(products.filter(prod => prod._id === req.params.id));
});

app.get("/", (req,res) => {
    res.send("Ecommerce Backend running yeah...");
});


app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} environment on port ${port}`))