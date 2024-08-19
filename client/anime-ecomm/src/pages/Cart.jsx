// This appears to be the correct code?

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  //for single product======================================================================================
  // const handleAddToCart = async (product) => {
  //   if (!isLoggedIn) {
  //     const existingItems = JSON.parse(localStorage.getItem('cart')) || [];
  //     const updatedItems = [...existingItems, product];
  //     localStorage.setItem('cart', JSON.stringify(updatedItems));
  //     setCart(updatedItems);
  //   } else {
  //     try {
  //       const response = await fetch('/cart', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${isLoggedIn.token}`, // Assuming isLoggedIn token is available
  //         },
  //         body: JSON.stringify({ isLoggedInId: isLoggedIn.id, productId: product.id, quantity: 1 }),
  //       });

  //       if (response.ok) {
  //         const updatedCart = await response.json();
  //         setCart(updatedCart.items);
  //       } else {
  //         console.error('Failed to add item to cart');
  //       }
  //     } catch (error) {
  //       console.error('Error adding item to cart:', error);
  //     }
  //   }
  // };

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
      {cart?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h3 className="item-name">{item.name}</h3>
            <img className="item-image" src={item.imageUrl} alt={item.name} />
            <p className="item-description">{item.description}</p>
            <p className="item-price">Price: ${item.price}</p>
            <button
              className="remove-button"
              onClick={() => handleRemoveFromCart(index)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Cart.css";

// const Cart = ({ isLoggedIn }) => {
//   const [cart, setCart] = useState(() => {
//     // Ensure cart is always initialized as an array
//     const localCart = JSON.parse(localStorage.getItem('cart')) || [];
//     return Array.isArray(localCart) ? localCart : [];
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const handleRemoveFromCart = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//   };

//   const handleCheckout = () => {
//     if (user) {
//       navigate('/checkout');
//     } else {
//       alert('Please log in to checkout');
//       navigate('/login');
//     }
//   };

//   return (
//     <div className='cart-container'>
//       <h2>My Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cart.map((item, index) => (
//           <div key={index} className='cart-item'>
//             <h3 className='item-name'>{item.name}</h3>
//             <img className='item-image' src={item.imageUrl} alt={item.name} />
//             <p className='item-description'>{item.description}</p>
//             <p className='item-price'>Price: ${item.price}</p>
//             <button className='remove-button' onClick={() => handleRemoveFromCart(index)}>
//               Remove
//             </button>
//           </div>
//         ))
//       )}
//       <button className='checkout-button' onClick={handleCheckout} disabled={cart.length === 0}>
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default Cart;
