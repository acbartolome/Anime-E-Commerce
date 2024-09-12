import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ShopAll.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ShopAll = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const route = category
          ? `https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product/category/${category}`
          : "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/product/";
        const response = await fetch(route);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // ----- handle logged in to add item to cart here ------
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  //.. add functionality for handleViewDetails here ------
  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {loading ? (
        loading && <p>Loading items....</p>
      ) : (
        <Container fluid>
          <Row>
            <Col className="header_title">
              <h1>{category ? category : "Shop All"}</h1>
            </Col>
          </Row>

          <Row>
            {products?.map((product) => (
              <Col
                key={product.id}
                xs={6}
                sm={4}
                md={3}
                lg={3}
                className="mb-4 mt-4 text-center"
              >
                <Card style={{ width: "100%", height: "100%" }}>
                  <Card.Img
                    onClick={() => navigate(`/products/${product.id}`)}
                    variant="top"
                    src={product.imageUrl}
                    className="product-image"
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="cartText">${product.price}</Card.Text>
                    <Button
                      variant="primary"
                      className="button"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      View details
                    </Button>
                    <Button
                      variant="success"
                      className="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
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
