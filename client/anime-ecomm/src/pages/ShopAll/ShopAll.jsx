import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopAll.css";
import { useSearchParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ShopAll =
  (/* add functionality here for loggining{ isLoggedIn, setCart }*/) => {
    // establishng the potential useState
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const navigate = useNavigate();
    // add search term? but should we click the 'search' button to actually display a new page?

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          console.log(category);
          // use to check which route if category or not
          const route = category
            ? `http://localhost:3000/product/category/${category}`
            : "http://localhost:3000/product/";
          const response = await fetch(route);
          const data = await response.json();
          setProducts(data);
          console.log(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchProducts();
    }, [category]);

    // ----- handle logged in to add item to cart here ------

    return (
      <>
        {/* map through the products */}
        {loading ? (
          <h1>Loading items....</h1>
        ) : (
          <div>
            {products?.map((product) => {
              return (
                <Card key={product.id} style={{ width: "18rem" }}>
                  <Card.Img
                    onClick={() => navigate(`/products/${product.id}`)}
                    variant="top"
                    src={product.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
      </>
    );
  };

export default ShopAll;
