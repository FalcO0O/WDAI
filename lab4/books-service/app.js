const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
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

// Middleware for JWT authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user; // Add user data to the request object
        next();
    });
}

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

app.post('/api/books', authenticateToken, async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) return res.status(400).send('Invalid data');

    try {
        const book = await Book.create({ title, author, year });
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/api/books/:id', authenticateToken, async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    try {
        await book.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Start server
app.listen(process.env.PORT, () =>
    console.log(`Books service running on port ${process.env.PORT}`)
);
