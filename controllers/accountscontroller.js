const Account = require('../models/Account');

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @access  Public
exports.getAccounts = async (req, res, next) => {
    try {
      const accounts = await Account.find();
  
      return res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

// @desc    Add account
// @route   POST /api/v1/accounts
// @access  Public
exports.addAccount = async (req, res, next) => {
  try {
    const { accountName, accountNumber, initialBalance, currentBalance, comments } = req.body;

    const account = await Account.create(req.body);

    return res.status(201).json({  // return code for successful create: 201
      success: true,
      data: account
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

// @desc    Delete account
// @route   DELETE /api/v1/accounts:id
// @access  Public
exports.deleteAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);

    if(!account){
      return res.status(404).json({
        success: false,
        error: 'No Accounts found'
      })
    }
    await account.remove(); 

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