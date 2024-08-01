const express = require("express");
const router = express.Router();

const {
  viewOrderHistory,
  getOrder,
} = require("../controllers/orderHistoryController");

// get all orders / view all orders for both
router.get("/:id", viewOrderHistory);

//get a specific order by ID of the user
router.get("/order/:id&:orderId", getOrder);

module.exports = router;
