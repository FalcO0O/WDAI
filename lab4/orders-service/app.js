const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database
const sequelize = new Sequelize(process.env.DB_URL);
const Order = sequelize.define('Order', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});
sequelize.sync();

// Requests
app.get('/api/orders/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
});

app.post('/api/orders', async (req, res) => {
    const { userId, bookId, quantity } = req.body;
    if (!userId || !bookId || !quantity) return res.status(400).send('Invalid data');
    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json(order);
});

app.delete('/api/orders/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    await order.destroy();
    res.status(204).send();
});

// Update order (PATCH)
app.patch('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, bookId, quantity } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');

    if (userId !== undefined) order.userId = userId;
    if (bookId !== undefined) order.bookId = bookId;
    if (quantity !== undefined) order.quantity = quantity;

    await order.save();
    res.json(order);
});

app.listen(process.env.PORT, () => console.log(`Orders service running on port ${process.env.PORT}`));
