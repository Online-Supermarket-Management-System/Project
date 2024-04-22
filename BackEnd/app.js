const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');

const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
