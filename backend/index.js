require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8020;

const orderschema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    contact_number: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Contact number should be 10 digits"],
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Email should be valid"],
    },
    password: { type: String, required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  
  {
    timestamps: true,
  }
);

const ordermodel = mongoose.model("customers", orderschema);

app.post("/create", async (req, res) => {
  try {
    const { password, email, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = require('crypto').randomBytes(64).toString('hex');

    const data = new ordermodel({ password: hashedPassword, email, verificationToken, ...rest });

    await data.save();

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.APP_PASSWORD
      }
    });

    // Send a verification email
    await transporter.sendMail({
      from: '"Your App" <yourapp@example.com>',
      to: email,
      subject: 'Please verify your email',
      text: `Please verify your email by clicking the following link: 
      http://localhost:8020/verify-email?token=${verificationToken}`
    });

    res.send({ success: true, message: "data created successfully" });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ success: false, message: error });
  }
});

app.put("/update", async (req, res) => {
  const { id, ...rest } = req.body;
  const data = await ordermodel.updateOne({ _id: id }, rest);
  res.send({ success: true, message: "updated successfuly", data: data });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await ordermodel.deleteOne({ _id: id });
  res.send({ success: true, message: "deleted successfully", data: data });
});

app.get("/count", async (req, res) => {
  try {
    const users = await ordermodel.find({});

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: true,
      message: "Order count successfully",
    //   data: data,
    });
  }
});

app.get("/order/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await ordermodel.findById(id);

    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.send({
      success: true,
      message: "User fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});
app.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    const user = await ordermodel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.send({ success: true, message: 'Email verification successful' });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ success: false, message: error });
  }
});
////Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ordermodel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "Please verify your email first" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    res
      .status(200)
      .json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error });
  }
});

mongoose
  .connect(
    "mongodb+srv://sid:sid@osmscluster.jt2ydor.mongodb.net/OSMSdata?retryWrites=true&w=majority&appName=OSMScluster"
  )
  .then(() => {
    // console.log(port number => ${PORT});
    app.listen(PORT, () => console.log("server connection successful"));
  })
  .catch((err) => {
    console.log(err);
  });