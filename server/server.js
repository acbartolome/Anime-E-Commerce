const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
app.use(express.json());

// add more routes here?

// iniialize server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
