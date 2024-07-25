const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// add cors
app.use(cors());

app.use("/server/user", userRoute);
// app.use("/server/admin");
// app.use("/server/product", productRoute);

// add more routes here?
// iniialize server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
