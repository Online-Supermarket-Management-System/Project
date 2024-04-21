const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("./userModel");
const mongoose = require("mongoose");


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "1231", {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { empId, firstName, email, password, lastName, contactNumber, accessType } = req.body;
  if (!empId || !firstName || !email || !password || !lastName || !contactNumber) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    empId,
    firstName,
    lastName,
    email,
    contactNumber,
    password: hashedPassword,
    role: "ADMIN"
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      empId: user.empId,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      userrole: user.userrole,
      token: generateToken(user._id),
      role: "ADMIN"
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { empId, password } = req.body;

  // Check for user email
  const user = await User.findOne({ empId });

  if (user) {
    // Check if user is approved
    if (user.approved) {
      // User is approved, proceed with login
      if (await bcrypt.compare(password, user.password)) {
        res.json({
          _id: user.id,
          name: user.firstName + " " + user.lastName,
          email: user.email,
          approved: user.approved, // Include the approved field in the response
          token: generateToken(user._id),
          status: 200,
          role: user.role
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    } else {
      // User is not approved, deny login
      res.status(400);
      throw new Error("Your account is pending approval by superadmin.");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});



// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  console.log("0000");
  res.status(200).json(req.user);
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const checkEmailExists = asyncHandler(async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const updateUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter
  const { newPassword } = req.body;

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
const updatePassword = asyncHandler(async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter
  const { currentPassword, newPassword } = req.body;

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Compare current password with hashed password stored in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error("Current password is incorrect");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const approveUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Log the user object before updating
    console.log("User before update:", user);

    // Update user's approval status
    user.approved = true; // Set the approved field to true
    await user.save(); // Save the updated user document
    
    // Retrieve the updated user from the database to ensure the approval status is updated
    const updatedUser = await User.findById(id);

    // Log the user object after updating
    console.log("User after update:", updatedUser);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// update a workout
const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
   // Check if the email already exists for another user
   const existingUser = await User.findOne({ email: email });
   if (existingUser && existingUser._id.toString() !== id) {
     return res.status(400).json({ error: "Email already exists for another user" });
   }
 
  const defaultTemModel = await User.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!defaultTemModel) {
    return res.status(400).json({ error: "No Such Workout" });
  }

  res.status(200).json(defaultTemModel);
};

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: id }); // Corrected to use deleteOne()

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  approveUser,
  getUserById,
  updateUserPassword,
  updatePassword,
  updateDocument,
  deleteUser,
  checkEmailExists 
};





