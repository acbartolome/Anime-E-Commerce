// ------------------------------- Tier 2 ---------------------------------------
// will continue to look into this

// import React, { useEffect, useState } from "react";

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
// const OrderHistory = ({ id }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const orderHistory = async () => {
//       const response = await fetch(
//         `https://anime-ecomm-database-7caa7cadec94.herokuapp.com/orderhistory/${id}`
//       );
//       const data = await response.json();
//       console.log(data);
//       setOrders(data);
//     };
//   });

//   return <div>ORDER HISTORY PAGE</div>;
// };

// export default OrderHistory;
