const express = require('express');
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactioncontroller');

const router = express.Router();

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction)
    .put(updateTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);

module.exports = router;