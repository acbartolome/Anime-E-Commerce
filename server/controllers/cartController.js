const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// view cart based on ID
const viewCartItem = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const cartItems = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: true,
      },
    });
    res.send(cartItems);
  } catch (error) {
    console.log(error);
  }
};

//edit the items in your cart using Patch
//identify the amount of items in the cart

//remove an item from your cart using Patch

module.exports = { viewCartItem };
