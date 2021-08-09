// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = (req, res, next) => {
    res.send('GET TRANSACTIONS');
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = (req, res, next) => {
    res.send('POST TRANSACTIONS');
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions:id
// @access  Public
exports.deleteTransaction = (req, res, next) => {
    res.send('DELETE TRANSACTIONS');
}