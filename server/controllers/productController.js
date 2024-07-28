const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    if (!products) {
      return res.status(404).send("Products was not found.");
    }

    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

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
