const express = require('express');
const { getAccounts, addAccount, deleteAccount } = require('../controllers/accountscontroller');

const router = express.Router();

router
    .route('/')
    .get(getAccounts)
    .post(addAccount);

router
    .route('/:id')
    .delete(deleteAccount);

module.exports = router;