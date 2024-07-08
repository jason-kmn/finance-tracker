const express = require('express');
const mongoose = require('mongoose');  // Correct the casing
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 3000;

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financeTracker',{

/*
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });

      */
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
    console.log('Server running the following port 3000');
});

