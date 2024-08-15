import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleProduct.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SingleProduct = ({ cart, setCart, isLoggedIn }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // ----- handle logged in to add item to cart here ------
  const handleAddToCart = () => {
    setCart([...cart, product]);
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="product-container">
          {product && (
            <Card className="product-card" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title className="product-title">
                  {product.name}
                </Card.Title>
                <Card.Text className="product-description">
                  ${product.price}
                </Card.Text>
                <Card.Text className="product-description">
                  {product.description}
                </Card.Text>
                <Button type="button" className="addToCart" variant="primary">
                  Add to cart
                </Button>
                <br />
                <Button
                  className="returnHome"
                  variant="secondary"
                  onClick={handleReturnHome}
                >
                  Return home
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default SingleProduct;
