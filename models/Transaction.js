const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionName: {
        type: String,
        trim: true,
        required: [true, 'Please add transaction name']
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Please add transaction type']
    },
    category: {
        type: String,
        trim: true,
        required: false
    },
    subCategory: {
        type: String,
        trim: true,
        required: false
    },
    accountId: {
        type: String,
        trim: true,
        required: false
    },
    merchantId: {
        type: String,
        trim: true,
        required: false
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    transactionDate: {
        type: Date,
        required: [true, 'Please add a transaction date']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    comments: {
        type: String,
        trim: true,
        required: false
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);