//For Users
const express = require("express");
const router = express.Router();
const { addToCart, removeItem } = require("../controllers/cartController");

// view cart based on ID
router.get("/", (req, res) => {
  console.log("view all items in cart");
});

//add to cart
router.post("/", addToCart);
//edit the items in your cart using Patch
//identify the amount of items in the cart
router.patch("/:id", (req, res) => {
  console.log("edit item in cart");
});

//remove an item from your cart using Patch
router.delete("/", removeItem);

module.exports = router;
