const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Get all users

router.get("/allUsers", getAllUsers);
router.get("/allUsers/:id", getSingleUser);
router.put("/cart/:id", updateUser);
router.delete("/cart/:id", deleteUser);

module.exports = router;
