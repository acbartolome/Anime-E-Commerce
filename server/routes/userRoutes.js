const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { JWT_SECRET_KEY } = process.env;

const requireUser = async (req, res, next) => {
  //check to see if there is a token already
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  //save the token
  const token = authHeader.split(" ")[1];

  try {
    //check if the specific user has matching token
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const userId = parseInt(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    // if (!user) {
    //   return res.status(403).json({ error: "User not found" });
    // }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid token" });
    next();
  }
};

// Get all users

router.get("/", getAllUsers);
router.get("/:id", requireUser, getSingleUser);

router.patch("/:id", requireUser, updateUser);
router.delete("/:id", requireUser, deleteUser);

module.exports = router;
