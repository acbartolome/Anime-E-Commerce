const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderHistoryController = require("../controllers/orderHistoryController");
const cartController = require("../controllers/cartController");

// Get all users
router.get("/", userController.getAllUsers);
