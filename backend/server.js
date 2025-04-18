const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes.js');
const dotenv = require('dotenv').config();
const Process = require('process');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(Process.env.DB_URL).then(() => { 
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/todos', todoRoutes);

app.listen(Process.env.PORT, () => console.log(`Server running on port ${Process.env.PORT}`));
