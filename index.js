const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3001;

const { response } = require("express");

app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/buihuy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Connection error:', err));

app.use(cors());

app.get("/", (req, res) => {
    res.json("Backend home");
});

// Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.listen(port, (req, res) => {
    console.log(`Backend is running at http://localhost:${port}`);
});