const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all items in the cart for a specific user
const getAllProductById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Retrieve cart items
    const cartItems = await prisma.cart.findUnique({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems) {
      return res.status(404).send({ error: "Cart is empty" });
    }

    res.send(cartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Handle checkout and save order details after successful payment
const checkout = async (req, res) => {
  const { cart, userId } = req.body;

  try {
    const order = await prisma.orderHistory.upsert({
      where: { userId },
      update: { history: { push: cart } },
      create: {
        userId,
        history: {
          items: cart,
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
    });

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Save order details after successful payment (this is typically called after payment is confirmed)
const saveOrder = async (req, res) => {
  const { userId, cart } = req.body;
  console.log({ userId, cart });
  try {
    const order = await prisma.orderHistory.update({
      where: {
        userId,
      },
      data: {
        history: {
          push: cart,
        },
      },
    });
    console.log("checkoutController:" + order);
    res.send(order);
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to save order");
  }
};

module.exports = { getAllProductById, saveOrder, checkout };
