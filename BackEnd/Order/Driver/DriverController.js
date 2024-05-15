// DriverController.js
const Driver = require('./DriverModel');

exports.createDriver = async (req, res) => {
  try {
    const { driverId, name, nic, location } = req.body;
    const newDriver = new Driver({ driverId, name, nic, location });
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const { driverId, name, NIC, location } = req.body;
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, { driverId, name, NIC, location }, { new: true });
    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
