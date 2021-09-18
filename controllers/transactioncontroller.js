const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    try {
      const transactions = await Transaction.find();
  
      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { transactionName, type, category, subCategory, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({  // return code for successful create: 201
      success: true,
      data: transaction
    })
    
  } catch (err) {
    if(err.name === 'ValidationError'){
      // create an array of error messages
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({   // return code for client error: 400
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return res.status(404).json({
        success: false,
        error: 'No Transactions found'
      })
    }
    await transaction.remove(); //the remove method is called on the resource 'transaction' instead of the model 'Transaction'

    return res.status(200).json({
      success: true,
      data: {}
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Update transaction
// @route   UPDATE /api/v1/transactions:id
// @access  Public
exports.updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.updateOne(
      { "_id": req.body._id },
      {
          "transactionName": req.body.transactionName,
          "type": req.body.type,
          "category": req.body.category,
          "subCategory": req.body.subCategory,
          "accountId": req.body.accountId,
          "merchantId": req.body.merchantId,
          "amount": req.body.amount,
          "transactionDate": req.body.transactionDate,
          "description": req.body.description,
          "comments": req.body.comments
      }
   );

    if(!transaction){
      console.log('Unable to update transaction')
      return res.status(404).json({
        success: false,
        error: 'Unable to update transaction'
      })
    }

    console.log('Transaction updated ', req.body)
    return res.status(200).json({
      success: true,
      data: transaction
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}