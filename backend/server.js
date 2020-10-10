const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/productRoutes');

const port = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(cors());

app.use('/api/products', productRoutes);

app.get("/", (req,res) => {
    res.send("Ecommerce Backend running yeah...");
});


app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} environment on port ${port}`))