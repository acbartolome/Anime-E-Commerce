import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ShopAll =
  (/* add functionality here for loggining{ isLoggedIn, setCart }*/) => {
    // establishng the potential useState
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // add search term? but should we click the 'search' button to actually display a new page?

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:3000/product/");
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
    }, []);

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
                  <Card.Img variant="top" src={product.imageUrl} />
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
