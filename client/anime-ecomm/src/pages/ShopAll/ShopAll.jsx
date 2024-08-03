import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopAll.css";
import { useSearchParams } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ShopAll =
  (/* add functionality here for loggining{ isLoggedIn, setCart }*/) => {
    // establishng the potential useState
    //use local storage which will save the items for when they need to login , create a func
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


    //.. add functionality for handleViewDetails here ------
    const handleViewDetails = (productId) => {
      navigate(`/products/${productId}`);
    };

    return (
      <>
        {loading ? (
          <h1>Loading items....</h1>
        ) : (
          <Container fluid>
            <Row>
              <Col className="header_title">
                <h1>{category ? category : "Shop All"}</h1>
              </Col>
            </Row>
            <Row>
              {products?.map((product) => (
                <Col key={product.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                  <Card style={{ width: "100%" }}>
                    <Card.Img
                      onClick={() => navigate(`/products/${product.id}`)}
                      variant="top"
                      src={product.imageUrl}
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      <Button variant="primary" onClick={() => handleViewDetails(product.id)}>View details</Button>
                      <Button variant="success">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </>
    );
  };

export default ShopAll;
