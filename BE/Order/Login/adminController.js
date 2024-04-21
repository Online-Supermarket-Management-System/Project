const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const config = require('../config/jwtToken');
const bcrypt = require('bcryptjs');


const adminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find admin by email
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token with role
      const token = jwt.sign({ userId: admin._id, role: admin.role }, config.jwtSecret, {
        expiresIn: '1h'
      });

      res.json({ token, role: admin.role });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  sendRecoveryEmail: async (req, res) => {
    const { recipient_email, OTP } = req.body;

    try {
      // Check if the recipient_email exists in the database
      const admin = await Admin.findOne({ email: recipient_email });
      if (!admin) {
        return res.status(404).json({ message: 'User does not exist, please check your email' });
      }

      // Send recovery email
      sendEmail({ recipient_email, OTP })
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'User does not exist, please try again!' });
      }

      // Update password in the database
      admin.password = newPassword;
      await admin.save();

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = adminController;
