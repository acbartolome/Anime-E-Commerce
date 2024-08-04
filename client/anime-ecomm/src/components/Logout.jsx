import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ setIsLoggedIn, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate, setIsLoggedIn, setToken]);

  return null;
};

export default Logout;
