import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, userId, setCart }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/account/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart, userId }),
      });

      if (response.ok) {
        await fetch('http://localhost:3000/orderhistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart, userId }),
        });

        setCart([]);
        navigate('/account/order-history');
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
