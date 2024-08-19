// this appears to be used for our attempt with stripe and tied to the Checkout.jsx file

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, isLoggedIn, userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isLoggedIn, setCart]);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      alert("Please log in to checkout");
      navigate("/secure/login");
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => {
          <div key={index} className="cart-item">
            <h3 className="item-name">{item.name}</h3>
            <img src={item.imageUrl} className="item-image" />
            <p className="item-description">{item.description}</p>
            <p className="item-price">{item.price}</p>
            <button
              className="remove-button"
              onClick={() => handleRemoveFromCart(index)}
            >
              Remove
            </button>
          </div>;
        })
      )}
      <button
        className="check-button"
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        {isLoggedIn ? "Checkout" : "Login to Checkout"}
      </button>
    </div>
  );
};

export default Cart;
