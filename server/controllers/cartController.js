const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Merge cart items from localStorage with the logged-in user's cart
const mergeCart = async (req, res) => {
  const { items } = req.body;
  const userId = req.user ? req.user.id : null; // Assuming middleware sets req.userId

  try {
    const existingCart = await prisma.cart.findUnique({ where: { userId } });

    if (existingCart) {
      const updatedItems = [...existingCart.items, ...items];
      const updatedCart = await prisma.cart.update({
        where: { userId },
        data: { items: updatedItems },
      });
      res.json(updatedCart);
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userId,
          items,
        },
      });
      res.json(newCart);
    }
  } catch (error) {
    console.error("Error merging cart:", error);
    res.status(500).json({ error: error.message });
  }
};

// View cart items for a specific user
// const viewCartItem = async (req, res) => {
//   try {
//     // const userId = req.user ? req.user.id : parseInt(req.params.userId);
//     const cartId = parseInt(req.params.id);
//     const cart = await prisma.cart.findUnique({
//       where: { id: cartId, },
//     },
//       include: {
//     items: true,
//   },
// );

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

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add an item to the cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {
        items: {
          push: { productId, quantity },
        },
      },
      create: {
        userId,
        items: [{ productId, quantity }],
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update the quantity of an item in the cart
const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await prisma.cart.update({
      where: { id: parseInt(id) },
      data: {
        items: {
          updateMany: {
            where: { id: parseInt(id) },
            data: { quantity },
          },
        },
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Remove an item from the cart
const removeItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await prisma.cart.update({
      where: { userId: parseInt(userId) },
      data: {
        items: {
          deleteMany: {
            where: { productId: parseInt(productId) },
          },
        },
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  viewCartItem,
  addToCart,
  updateCartItem,
  removeItem,
  mergeCart,
};
