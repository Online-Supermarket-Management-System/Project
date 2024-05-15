const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');

const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
const salaryRoutes = require("./Order/Salary/SalaryRoute");
const productRoutes = require("./Order/Product/ProductRoute");
const billingRoutes = require("./Order/Billing/BillingRoute");
const paymentRoutes = require("./Order/Payment/PaymentRoute");
const orderRoutes = require('./Order/Order/OrderRoute');
const driverRoutes = require('./Order/Driver/DriverRoute');
const feedbackRoutes = require('./Order/Feedback/FeedbackRoute');

// Enable CORS for specific origin and allow necessary headers and methods
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Service Management

app.use("/auth", require("./Order/admin-auth/userRoutes"));
app.use("/", require("./Order/Customer/CustomerRoutes"));
app.use("/salaryRoutes", salaryRoutes)
app.use("/product", productRoutes);
app.use("/billing", billingRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);
app.use('/drivers', driverRoutes);
app.use('/api/feedback', feedbackRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
