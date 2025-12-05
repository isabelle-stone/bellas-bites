const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;

const MenuItem = require('./models/MenuItems');
const Order = require('./models/Order');

require('dotenv').config();


const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => console.log('hiya mongodb'))
    .catch(err => console.error('NOOOOOooooooo ', err));

app.use(cors());

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: "hiiiii" });
});

app.get('/api/test', (req, res) => {
    res.json({ message: "byeeeeee", timestamp: new Date().toISOString() })
})

app.post('/api/orders', async (req, res) => {
    try {
        const { customerInfo, items, totalAmount } = req.body;
        const newOrder = new Order({
            customerInfo,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Your Order was placed :)',
            orderId: savedOrder._id
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'There was an error placing your order.',
            error: error.message
        });
    }
})

app.get('/api/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.listen(PORT, () => {
    console.log(`AHHHHHHHHHHHHHHhhhhhh`);
});
