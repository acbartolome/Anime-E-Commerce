const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
app.use(express.json());

// add cors
const cors = require("cors");
app.use(cors);

app.use("/server/user");
app.use("/server/admin");
app.use("/server/product");

// add more routes here?
// iniialize server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
