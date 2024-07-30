const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getSingleProduct,
  getProductByCategory,
} = require("../controllers/productController");

//view all product as user and admin
router.get("/", getAllProduct);

//view specific product by id
router.get("/:id", getSingleProduct);

//add product to cart
router.patch("/:id", (req, res) => {
  console.log("add to cart");
});

//admin specific
//able to create a product
//tokenAuth for the admin to be verified
router.post("/", (req, res) => {
  console.log("admin post product");
});

//update the product by patch
router.put("/:id", (req, res) => {
  console.log("admin update product");
});

//delete the product by delete
router.delete("/:id", (req, res) => {
  console.log("admin deleted product");
});

//get items by category instead of id
router.get("/:category", getProductByCategory);

module.exports = router;
