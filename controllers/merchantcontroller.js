const Merchant = require('../models/Merchant');

// @desc    Get all merchants
// @route   GET /api/v1/merchants
// @access  Public
exports.getMerchants = async (req, res, next) => {
    try {
      const merchants = await Merchant.find();
  
      return res.status(200).json({
        success: true,
        count: merchants.length,
        data: merchants
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

// @desc    Add merchant
// @route   POST /api/v1/merchants
// @access  Public
exports.addMerchant = async (req, res, next) => {
  try {
    const { merchantName } = req.body;

    const merchant = await Merchant.create(req.body);

    return res.status(201).json({  // return code for successful create: 201
      success: true,
      data: merchant
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

// @desc    Delete merchant
// @route   DELETE /api/v1/merchants:id
// @access  Public
exports.deleteMerchant = async (req, res, next) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if(!merchant){
      return res.status(404).json({
        success: false,
        error: 'No Merchants found'
      })
    }
    await merchant.remove(); 

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