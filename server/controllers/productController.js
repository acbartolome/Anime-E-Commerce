const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    if (!products) {
      return res.status(404).send("Products was not found.");
    }

    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

//get by category
//review this, i didnt get it.

const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
    });
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

//Create Product - Admin Only
// add another parameter that allows for only admins
const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: +price,
        imageUrl,
        category,
        stock: +stock,
      },
    });
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
  }
};

// edit product - admin only
const editProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    console.log(req.body);
    const { name, description, price, imageUrl, category, stock } = req.body;
    const data = {};
    if (name) {
      data.name = name;
    }
    if (description) {
      data.description = description;
    }
    if (price) {
      data.price = +price;
    }
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }
    if (category) {
      data.category = category;
    }
    if (stock) {
      data.stock = +stock;
    }
    console.log(data);
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });
    res
      .status(200)
      .send(updateProduct, { message: "Product successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

// delete product - admin only
const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).send("Product successfully deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  getProductByCategory,
  editProduct,
  deleteProduct,
};
