const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  getUserById,
  approveUser,
  deleteUser,
  updateUserPassword,
  updatePassword,
  checkEmailExists ,
  updateDocument,
  getUserRole
} = require("./userController");
// const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.get("/", getAllUsers);
router.post("/password/:userId", updatePassword);
//Update a document
router.patch('/:id',updateDocument)
router.patch("/approve/:id", approveUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/check-email/:email", checkEmailExists);
router.post('/get-user-role', getUserRole);

module.exports = router;
