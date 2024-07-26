const express = require("express");
const router = express.Router();
const { getAllUsers, getSingleUser } = require("../controllers/userController");
// const productController = require("../controllers/productController");
// const orderHistoryController = require("../controllers/orderHistoryController");
// const cartController = require("../controllers/cartController");

// Get all users

router.get("/allUsers", getAllUsers);
router.get("/allUsers/:id", getSingleUser);

//Get Cart
router.get("/cart", cartController.getCart);
module.exports = router;
