const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        trim: true,
        required: [true, 'Please enter a name for the account']
    },
    accountNumber: {
        type: String,
        required: false
    },
    initialBalance: {
        type: Number,
        default: 0
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        trim: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Account', AccountSchema)