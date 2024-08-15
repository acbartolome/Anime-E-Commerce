import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import Account from "./pages/Account";
import AdminPage from "./pages/AdminPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import OrderHistory from "./pages/OrderHistory";
import Register from "./pages/Register";
import ShopAll from "./pages/ShopAll/ShopAll";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [id, setId] = useState(localStorage.getItem("id") || null);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       if (id) {
  //         const response = await fetch(`http://localhost:3000/users/${id}`);
  //         const data = await response.json();
  //         setAdmin(data.admin);
  //       }
  //     } catch (error) {
  //       console.error("There was an issue with fetching user");
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} id={id} admin={admin} token={token} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isLoggedIn={isLoggedIn}
                token={token}
                admin={admin}
                id={id}
              />
            }
          />
          <Route
            path="/collections/shop-all"
            element={
              <ShopAll
                cart={cart}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                token={token}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <SingleProduct
                cart={cart}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                token={token}
              />
            }
          />
          <Route
            path="/secure/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setId={setId}
                setAdmin={setAdmin}
              />
            }
          />
          <Route
            path="/logout"
            element={
              <Logout setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            }
          />
          <Route
            path="/secure/register"
            element={
              <Register
                setToken={setToken}
                setIsLoggedIn={setIsLoggedIn}
                setId={setId}
                setAdmin={setAdmin}
              />
            }
          />
          <Route
            path="/account/:id"
            element={
              <Account
                token={token}
                cart={cart}
                isLoggedIn={isLoggedIn}
                id={id}
              />
            }
          />
          <Route
            path="/account/order-history"
            element={<OrderHistory token={token} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                token={token}
              />
            }
          />
          <Route
            path="/auth/admin-page"
            element={
              <AdminPage admin={admin} isLoggedIn={isLoggedIn} token={token} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
