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
  login
} = require('./controller');

router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteOne);
router.get("/count", count);
router.get("/getOrder/:id", getOrder);
router.get("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;