const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all items in cart from user
const getAllProductById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const cartItems = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
    res.send(cartItems);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProductById };
