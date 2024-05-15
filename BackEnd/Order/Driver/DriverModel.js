const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverId: { type: String, required: true },
  name: { type: String, required: true },
  nic: { type: String, required: true },
  location: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // Array of orders assigned to the driver
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
