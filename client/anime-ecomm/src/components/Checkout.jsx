import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart, id, token }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !token) {
      console.error("Invalid user object");
      return;
    }
  }, [id, token]);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "anime-e-commerce-apgc8t6g5-brad434s-projects.vercel.app/account/checkout",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming the user token is stored in localStorage
          },
          body: JSON.stringify({ cart, userId: id }), // Sending userId along with cart
        }
      );
      const data = await response.json();
      console.log(data);

      localStorage.removeItem("cart"); // Clear the cart after successful checkout
      navigate("/account/order-history"); // Navigate to order history page
    } catch (error) {
      console.error("Error during checkout:", error);
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
