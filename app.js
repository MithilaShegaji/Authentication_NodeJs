// app.js

require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require("path");
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const staticRoutes = require('./routes/staticRoutes');
const { connectToMongoDB } = require("./connection");
const { checkUser } = require("./middleware/authMiddleware");

const app = express();
const PORT = 8002;

app.use(session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToMongoDB('mongodb://127.0.0.1:27017/sams')
    .then(() => console.log("MongoDB connected\nClick on http://localhost:8002/auth/signup"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.get('*', checkUser);
app.use('/auth', authRoutes);
app.use('/', staticRoutes);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});

module.exports = app;
