// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Cart.css";

// const Cart = ({ cartItems, setCartItems, user }) => {

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleRemoveFromCart = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//   };

//   const handleAddToCart = async (product) => {
//     if (!user) {
//       const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//       const updatedItems = [...existingItems, product];
//       localStorage.setItem('cartItems', JSON.stringify(updatedItems));
//       setCartItems(updatedItems);
//     } else {
//       try {
//         const response = await fetch('/cart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${user.token}`, // Assuming user token is available
//           },
//           body: JSON.stringify({ userId: user.id, productId: product.id, quantity: 1 }),
//         });

//         if (response.ok) {
//           const updatedCart = await response.json();
//           setCartItems(updatedCart.items);
//         } else {
//           console.error('Failed to add item to cart');
//         }
//       } catch (error) {
//         console.error('Error adding item to cart:', error);
//       }
//     }
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
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         cartItems.map((item, index) => (
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
//       <button className='checkout-button' onClick={handleCheckout}>
//         Checkout
//       </button>

//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Ensure cartItems is always initialized as an array
    const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    return Array.isArray(localCart) ? localCart : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      alert('Please log in to checkout');
      navigate('/login');
    }
  };

  return (
    <div className='cart-container'>
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className='cart-item'>
            <h3 className='item-name'>{item.name}</h3>
            <img className='item-image' src={item.imageUrl} alt={item.name} />
            <p className='item-description'>{item.description}</p>
            <p className='item-price'>Price: ${item.price}</p>
            <button className='remove-button' onClick={() => handleRemoveFromCart(index)}>
              Remove
            </button>
          </div>
        ))
      )}
      <button className='checkout-button' onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
