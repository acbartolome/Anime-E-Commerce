const express = require("express");
const router = express.Router();
const { saveOrder } = require("../controllers/checkoutController");

// This route should match the one used in your frontend fetch call
router.patch("/", saveOrder);

module.exports = router;
