const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database
const sequelize = new Sequelize(process.env.DB_URL);
const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
});
sequelize.sync();

// Requests
app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

app.post('/api/books', async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) return res.status(400).send('Invalid data');
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
});

app.delete('/api/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    await book.destroy();
    res.status(204).send();
});

app.listen(process.env.PORT, () => console.log(`Books service running on port ${process.env.PORT}`));
