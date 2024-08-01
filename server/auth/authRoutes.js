const express = require("express");
const router = express.Router();
const { register, login } = require("../auth/authController");

router.post("/", register);
router.post("/login", login);

module.exports = router;
