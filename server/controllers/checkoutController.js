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
    // Process the order (e.g., validate cart, calculate total, etc.)
    // Save the order to the database
    const order = await prisma.orderHistory.create({
      data: {
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
  try {
    const order = await prisma.orderHistory.create({
      data: {
        userId,
        cart: cart, // You can customize what details you want to save
        createdAt: new Date(),
      },
    });
    res.send(order);
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Failed to save order");
  }
};

module.exports = { getAllProductById, saveOrder, checkout }; // Ensure 'checkout' is exported
