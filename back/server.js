import express from 'express';
import apiRoutes from './routes/api.js';
import cors from 'cors';

// const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable all CORS requests
app.use(express.json()); // Middleware to parse JSON

// Import and use the routes
// const apiRoutes = require('./routes/api.ts');
app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
