const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  try {
    const newProduct = await prisma.product.create({
      data: req.body, //everything inside of the body will be saved
    });
    res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProduct };
