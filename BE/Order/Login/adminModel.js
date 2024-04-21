const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

