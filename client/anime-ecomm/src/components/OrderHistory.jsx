import React, { useEffect, useState } from 'react';

const OrderHistory = ({ userId }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/order-history/${userId}`);
        const data = await response.json();
        setOrderHistory(data.history);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div>
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orderHistory.map((order, index) => (
          <div key={index}>
            <h3>Order {index + 1}</h3>
            {order.items.map((item, idx) => (
              <div key={idx}>
                <p>{item.name} - {item.quantity} x ${item.price}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
