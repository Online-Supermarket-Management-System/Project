const mongoose = require('mongoose');

// Define a custom validation function for float numbers
function validateFloat(value) {
    // Regular expression to match float format with optional decimal part
    const floatRegex = /^\d+(\.\d{1,2})?$/;
    return floatRegex.test(value);
}

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Email should be valid"]
    },
    status : String,
    basicSalary : {
        type: Number,
        validate: {
            validator: validateFloat,
            message: 'Basic salary should be in float format (e.g., 25000.00)'
        }
    },
    otHours : {
        type: Number,
        validate: {
            validator: validateFloat,
            message: 'OT hours should be in float format (e.g., 40.00)'
        }
    },
    otRatePerHour : {
        type: Number,
        validate: {
            validator: validateFloat,
            message: 'OT rate per hour should be in float format (e.g., 20.00)'
        }
    },
    allowances : {
        type: Number,
        validate: {
            validator: validateFloat,
            message: 'Allowances should be in float format (e.g., 5000.00)'
        }
    },
    totalSalary : {
        type: Number,
        validate: {
            validator: validateFloat,
            message: 'Total salary should be in float format (e.g., 30000.00)'
        }
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
