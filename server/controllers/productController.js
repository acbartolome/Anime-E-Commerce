const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params.id;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

//Create Product - Admin Only
// add another parameter that allows for only admins
const createProduct = async (req, res) => {
  try {
    const newProduct = prisma.product.create({
      data: req.body,
    });
    res.send(newProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProduct, getSingleProduct, createProduct };
