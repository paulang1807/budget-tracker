const express = require('express');
const { getMerchants, addMerchant, deleteMerchant } = require('../controllers/merchantcontroller');

const router = express.Router();

router
    .route('/')
    .get(getMerchants)
    .post(addMerchant);

router
    .route('/:id')
    .delete(deleteMerchant);

module.exports = router;