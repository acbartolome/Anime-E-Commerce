const express = require("express");
const router = express.Router();

// get all orders / view all orders for both
router.get("/", (res, req) => {
  console.log("all order history");
});

//get a specific order by ID of the user
router.get("/:id", (req, res) => {
  console.log("specific order history by user id");
});

module.exports = router;
