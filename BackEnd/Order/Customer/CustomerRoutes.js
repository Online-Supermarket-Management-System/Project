// CustomerRoutes.js
const express = require('express');
const router = express.Router();
const {
  create,
  update,
  deleteOne,
  count,
  getOrder,
  verifyEmail,
  login,
  getCustomer,
  addToCart
} = require('./Customer');

router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteOne);
router.get("/count", count);
router.get("/getOrder/:id", getOrder);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/getCustomer/:email", getCustomer);
router.get("/cart/items", addToCart);
module.exports = router;