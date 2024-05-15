// AdRoute.js
const express = require('express');
const router = express.Router();
const billingController = require('./billingController');

// Define routes
router.get('/', billingController.getAllBills);
router.get('/:id', billingController.getBillById);
router.post('/', billingController.createBill);
router.put('/:id', billingController.updateBill);
router.delete('/:id', billingController.deleteBill);



module.exports = router;
