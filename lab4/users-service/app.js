const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database
const sequelize = new Sequelize(process.env.DB_URL);

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync(); // Synchronizuje model z bazą danych

// Secret Key for JWT
const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint: Rejestracja użytkownika
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Invalid data');

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashowanie hasła
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send('Email already in use');
        } else {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
});

// Endpoint: Logowanie użytkownika
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Invalid data');

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).send('Invalid credentials');
        }

        // Generowanie tokena JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            SECRET_KEY,                         // Klucz tajny
            { expiresIn: '1h' }                 // Czas ważności tokena
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Start serwera
app.listen(process.env.PORT, () =>
    console.log(`Users service running on port ${process.env.PORT}`)
);
