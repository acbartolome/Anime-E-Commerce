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

// Add product to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log({ userId, productId, quantity });

  try {
    // Find the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // Parse the items array
    let items = cart?.items || [];

    console.log(cart);
    console.log(items);
    // Check if the product is already in the cart
    const productIndex = items.findIndex(item => item.productId === productId);
    console.log(productIndex);

    if (productIndex !== -1) {
      // Update quantity if product is already in the cart
      items[productIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      items.push({ productId, quantity });
      console.log(items);
    }

    // Update the cart with the new items array
    let updatedCart;
    if (cart) {
      updatedCart = await prisma.cart.update({
        where: { userId },
        data: { items },
      });
      console.log(updatedCart);
    } else {
      updatedCart = await prisma.cart.create({
        data: { userId, items },
      });
      console.log(updatedCart);
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

//edit the item in your cart will be done in frontend.

//remove an item from your cart using Patch
const removeItem = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: parseInt(userId),
      },
    });
    console.log(userCart);

    const items = userCart.items.filter(item => item.productId !== productId);
    const updateItem = await prisma.cart.update({
      where: {
        userId,
      },
      data: {
        items,
      },
    });
    res.send(updateItem);
  } catch (error) {
    console.log(error);
  }
};

//checkout function

module.exports = { viewCartItem, addToCart, removeItem };
