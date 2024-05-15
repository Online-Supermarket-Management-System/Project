const Order = require('./OrderModel');
const CartItem = require('../Cart/CartModel');
const Driver = require('../Driver/DriverModel');


exports.createOrder = async (req, res) => {
    try {
      const { firstName, lastName, delivery } = req.body;
  
      // Retrieve all items from the cart along with their quantities, prices, and names
      const cartItems = await CartItem.find({})
        .populate({
          path: 'product',
          select: 'name price'
        })
        .select('product quantity');
  
      // Create order items array
      const orderItems = cartItems.map(item => ({
        productId: item.product._id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity
      }));
  
      // Create new order with cart items
      const newOrder = new Order({
        firstName,
        lastName,
        delivery,
        orderItems
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Clear the cart after creating the order
      await CartItem.deleteMany({});
  
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateOrder = async (req, res) => {
    try {
      const { firstName, lastName, delivery, orderItems } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        delivery,
        orderItems
      }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.assignDriverToOrder = async (req, res) => {
    try {
      const { id, driverId } = req.body;
      
      // Check if both orderId and driverId are provided
      if (!id || !driverId) {
        return res.status(400).json({ message: "Both orderId and driverId are required" });
      }
      
      // Check if the order exists
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Check if the driver exists
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
  
      // Assign the order to the driver
      driver.orders.push(id);
      await driver.save();
  
      res.status(200).json({ message: "Order assigned to driver successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };