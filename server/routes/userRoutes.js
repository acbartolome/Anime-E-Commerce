const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderHistoryController = require("../controllers/orderHistoryController");
const cartController = require("../controllers/cartController");

// Get all users
router.get("/allUsers", getAllUsers);

export default router;
