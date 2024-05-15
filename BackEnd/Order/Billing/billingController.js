const Bill = require("./BillingModel");

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBill = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      time,
      address,
      postalCode,
      city,
      email,
      delivery
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !time ||
      !address ||
      !postalCode||
      !city||
      !email||
      !delivery
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const bill = new Bill({
      firstName,
      lastName,
      time,
      address,
      postalCode,
      city,
      email,
      delivery
    });
    await bill.save();
    res
      .status(201)
      .json({ message: "Bill created successfully", bill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      time,
      address,
      postalCode,
      city,
      email,
      delivery
    } = req.body;

    // Validate all fields are provided
    if (
      !firstName ||
      !lastName ||
      !time ||
      !address ||
      !postalCode||
      !city||
      !email||
      !delivery
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        time,
        address,
        postalCode,
        city,
        email,
        delivery
      },
      { new: true }
    );
    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json({
      message: "Bill updated successfully",
      bill: updatedBill,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json({ message: "Bill deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};










