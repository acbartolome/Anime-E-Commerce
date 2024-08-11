const express = require("express");
const router = express.Router();
const { getAllProductById } = require("../controllers/checkoutController");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
router.get("/", getAllProductById);

//stripe route
router.post("/payment", async (req, res) => {
  const { products } = req.body;

  const listItems = products.map(product => ({
    price_date: {
      currency: "usd",
      product_date: {
        name: product.name,
        price_amount: product.price,
        quantity: product.quantity,
        images: [product.imageUrl],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.create({
    payment_method_types: ["card"],
    line_items: listItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
});

module.exports = router;
