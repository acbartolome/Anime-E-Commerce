import React, { useEffect, useState } from "react";

const OrderHistory = ({ id }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderHistory = async () => {
      const response = await fetch(
        `anime-e-commerce-apgc8t6g5-brad434s-projects.vercel.app/orderhistory/${id}`
      );
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };
  });

  return <div>ORDER HISTORY PAGE</div>;
};

export default OrderHistory;
