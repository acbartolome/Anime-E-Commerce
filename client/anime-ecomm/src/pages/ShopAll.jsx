import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ShopAll =
  (/* add functionality here for loggining{ isLoggedIn, setCart }*/) => {
    // establishng the potential useState
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // add search term? but should we click the 'search' button to actually display a new page?

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://localhost:3000/server/product");
          const data = await response.json();
          setProducts(data.products);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProducts();
    }, []);

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>LIMITED EDITION</Card.Title>
          <Card.Text>$4,999.99</Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    );
  };

export default ShopAll;
