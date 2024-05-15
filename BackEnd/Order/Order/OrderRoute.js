const express = require('express');
const router = express.Router();
const orderController = require('./OrderController');

// POST - Create a new order
router.post('/', orderController.createOrder);
// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/order/:id', orderController.getOrderById);

// Update an order
router.put('/order/:id', orderController.updateOrder);

// Delete an order
router.delete('/order/:id', orderController.deleteOrder);

router.put('/order/assign-driver/:id', orderController.assignDriverToOrder);

module.exports = router;
