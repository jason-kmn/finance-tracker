const express = require('express');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');
const router = express.Router();


const SECRET = process.env.SECRET || 'aaaabbbbaaabbbaaabaabaabaabaaba';

router.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token is required for authentication');
    try{
        const decode = jwt.verify(token, SECRET);
        req.user = decode;
    }catch (error) {
        return res.status(401).send('Invalid Token !');
    }
    return next();
});

router.post('/transactions', async(req, res) =>{
    try {
        const { amount, cetegory} = req.body;
        const transaction = new Transaction({
            user: req.user.userId, amount, category,
        });
        await transaction.save();
        res.status(201).send('Transaction Sucessfully added');
    } catch(error){
        res.status(500).send('Transaction failed to be added !');
    }
});

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.userId});
        res.json(transactions);
    }catch(error){res.status(500).send('Error fetching Transaction !');}
});


module.exports = router;