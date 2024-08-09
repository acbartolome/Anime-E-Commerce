const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = process.env;
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    console.log(user);

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    res
      .status(201)
      .send({ user, token, message: "Account successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Register Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(401).send("User not found!");
    }

    //Step 1 choice

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatched " + isMatch);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials!");
    }

    // generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    console.log(token);
    res
      .status(200)
      .send({ token, message: "Successfully logged in.", id: user.id });

    //STEP2 : Alternate in finding user and password
    // if (user && bcrypt.compare(password, user.password)) {
    //   const token = jwt.sign(
    //     {
    //       id: user.id,
    //       email,
    //     },
    //     JWT_SECRET_KEY,
    //     {
    //       expiresIn: "1m",
    //     }
    //   );
    //   res.send(user, token);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Login Error" });
  }
};

module.exports = { register, login };
