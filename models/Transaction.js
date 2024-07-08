const mongoose = require('mongoose');
const User = require('./User');



//Implementing Transactions Schema 


const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    amount: { type:Number, required: true },
    category: { type: String , required: true},
    date : {type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;

