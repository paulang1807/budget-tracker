const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    merchantName: {
        type: String,
        trim: true,
        required: [true, 'Please enter a name for the merchant']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Merchant', MerchantSchema)