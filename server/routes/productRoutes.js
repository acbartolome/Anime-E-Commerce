const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  getProductByCategory,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");

//view all product as user and admin
router.get("/", getAllProduct);

//view specific product by id
router.get("/:id", getSingleProduct);

//add product to cart
// router.patch("/:id", (req, res) => {
//   console.log("add to cart");
// });

//admin specific
//able to create a product
//tokenAuth for the admin to be verified
router.post("/", createProduct);

//update the product by patch
// updated to patch so we can edit inventory number
router.patch("/:id", editProduct);

//delete the product by delete
router.delete("/:id", deleteProduct);
// this portion of the code doesn't work since the route expects an "id"
// adding "/category/:category" resolves the issue so get request works
//get items by category instead of id
router.get("/category/:category", getProductByCategory);

module.exports = router;
