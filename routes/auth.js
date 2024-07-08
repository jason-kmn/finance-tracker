const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.SECRET || 'aaaabbbbaaabbbaaabaabaabaabaaba';



// User Registration and Server responses
router.post('/register', async (req, res) => {
    try{
        const { username, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashPassword}); // Hashes the users password and embodies its credentials for registration
        await user.save();
        res.status(201).send('User Resgistered Sucessfully !');
    }catch (error) { res.status(500).send('Failed to register User');}
    
});



// User Login and Server responses
router.post('/login',async(req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (user && await bcrypt.compare(password, User.password)) {
            const token = jwt.sign({userId: user._id},SECRET, {expiresIn: '2h' });
            res.json({token});
        }else {
            res.status(401).send('User Not Found');

        }
    }catch (error){
        res.status(500).send('Error logging in !');
    }
});

module.exports = router;
