const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const productController = require("../controllers/productController");
// const orderHistoryController = require("../controllers/orderHistoryController");
// const cartController = require("../controllers/cartController");

// Get all users

router.get("/allUsers", getAllUsers);
router.get("/allUsers/:id", getSingleUser);
router.put("/cart/:id", updateUser);
router.delete("/cart/:id", deleteUser);

module.exports = router;
