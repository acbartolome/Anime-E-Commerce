import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopAll =
  (/* add functionality here for loggining{ isLoggedIn, setCart }*/) => {
    // establishng the potential useState
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // add search term? but should we click the 'search' button to actually display a new page?

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch();
          // "https://localhost:3000/"
        } catch (error) {}
      };
    });

    return <div>SHOP ALL PAGE</div>;
  };

export default ShopAll;
