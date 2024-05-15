const Userdb = require("./SalaryModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Userdb.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Userdb.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      status,
      basicSalary,
      otHours,
      otRatePerHour,
      allowances,
      totalSalary
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !status ||
      !basicSalary ||
      !otHours ||
      !otRatePerHour ||
      !allowances ||
      !totalSalary
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new Userdb({
      name,
      email,
      status,
      basicSalary,
      otHours,
      otRatePerHour,
      allowances,
      totalSalary
    });
    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      status,
      basicSalary,
      otHours,
      otRatePerHour,
      allowances,
      totalSalary
    } = req.body;

    // Validate all fields are provided
    if (
      !name ||
      !email ||
      !status ||
      !basicSalary ||
      !otHours ||
      !otRatePerHour ||
      !allowances ||
      !totalSalary
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedUser = await Userdb.findByIdAndUpdate(
      id,
      {
        name,
        email,
        status,
        basicSalary,
        otHours,
        otRatePerHour,
        allowances,
        totalSalary
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Userdb.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
