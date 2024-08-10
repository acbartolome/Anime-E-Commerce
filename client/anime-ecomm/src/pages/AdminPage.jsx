import React from "react";
import { useState, useEffect } from "react";
// continue to create the admin page to view all users, create, edit, delete products
// edit option will be similar to account endit

const AdminPage = (admin, isLoggedIn) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  // create product useState
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (admin) {
          const response = await fetch("http://localhost:3000/users/");
          const data = await response.json();
          console.log("USER DATA", data);
          setUsers(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching users");
      }
    };
    fetchUsers();
  }, []);

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (admin) {
          const response = await fetch("http://localhost:3000/product/");
          const data = await response.json();
          console.log("PRODUCT DATA", data);
          setProducts(data);
        }
      } catch (error) {
        console.error("Something went wrong when fetching products");
      }
    };
    fetchProducts();
  }, []);

  // create products
  const handleCreateProduct = async (event) => {
    event.preventDefault();
    const productObject = {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
    };
    try {
      if (admin) {
        const response = await fetch("http://localhost:3000/product/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productObject),
        });
        const data = await response.json();
        alert("You have successfully added a product");
      }
    } catch (error) {
      console.error("Opps, something went wrong when creating a product");
    }
  };
  // edit products
  const handleEditProduct = async (event) => {
    event.preventDefault();
    try {
      if (admin) {
        const response = await fetch(`http://localhost:3000/product/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            price,
            imageUrl,
            category,
            stock,
          }),
        });
        console.log("PATCH RESPONSE", { response });
        const data = await response.json();
        console.log("PATCH DATA", data);
        setProduct(data);
      }
    } catch (error) {
      console.error("Something went wrong when editing product data");
    }
  };

  // delete products
  const handleDeleteProduct = async (event) => {
    event.preventDefault();
    try {
      if (admin) {
        const response = await fetch(`http://localhost:3000/product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        alert("You have deleted a product");
      }
    } catch (error) {
      console.error("There was an issue deleting a product", error);
    }
  };
  return <div>ADMIN PAGE</div>;
};

export default AdminPage;
