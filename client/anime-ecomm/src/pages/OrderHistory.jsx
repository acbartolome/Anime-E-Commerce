import React, { useEffect, useState } from "react";

const OrderHistory = ({ id }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderHistory = async () => {
      const response = await fetch(
        `https://anime-e-commerce-backend.onrender.com/orderhistory/${id}`
      );
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };
  });

  return <div>ORDER HISTORY PAGE</div>;
};

export default OrderHistory;
