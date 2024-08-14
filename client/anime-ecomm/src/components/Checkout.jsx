import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.id || !user.token) {
      console.error('Invalid user object');
      return;
    }
  }, [user, navigate]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/account/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,  // Assuming the user token is stored in localStorage
        },
        body: JSON.stringify({ cart, userId: user.id }),  // Sending userId along with cart
      });

      if (response.ok) {
        await fetch('http://localhost:3000/orderhistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,  // Again, include the token
          },
          body: JSON.stringify({ cart, userId: user.id }),
        });

        setCart([]);  // Clear the cart after successful checkout
        navigate('/account/order-history');  // Navigate to order history page
      } else {
        console.error('Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Confirm and Pay</button>
    </div>
  );
};

export default Checkout;
