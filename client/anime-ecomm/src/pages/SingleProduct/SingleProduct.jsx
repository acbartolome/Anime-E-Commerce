import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleProduct.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // ----- handle logged in to add item to cart here ------

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div>
          <>
            <Card key={product.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">Add to cart</Button>
              </Card.Body>
            </Card>
          </>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
