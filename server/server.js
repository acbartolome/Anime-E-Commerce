const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoute = require("./routes/cartRoutes");
const orderHistoryRoute = require("./routes/orderHistoryRoutes");
const registerRoute = require("./auth/authRoutes");
const checkoutRoute = require("./routes/checkoutRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/users", userRoute);
// app.use("/server/admin");
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/orderhistory", orderHistoryRoute);
app.use("/account/checkout", checkoutRoute);
app.use("/auth", registerRoute);

// app.use("/logout")

// add more routes here?
// iniialize server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
