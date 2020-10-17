const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req,res) => {
    res.send("Ecommerce Backend running yeah...");
});


app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} environment on port ${port}`))