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

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedItems = [...existingItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      setCart(updatedItems);
    } else {
      try {
        const response = await fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userId: localStorage.getItem('userId'), productId: product.id, quantity: 1 }),
        });

        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
        } else {
          console.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="product-container">
          {product && (
            <Card className="product-card" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.imageUrl} />
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
                <Button className="addToCart" variant="primary" onClick={handleAddToCart}>
                  Add to cart
                </Button>
                <br />
                <Button className="returnHome" variant="secondary" onClick={() => navigate('/')}>
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
