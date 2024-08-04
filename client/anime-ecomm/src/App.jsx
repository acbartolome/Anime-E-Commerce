import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
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

// Routes needed
// Landing Page (Home), done
// Shop all, done
// clothing, done
// collectables, done
// home entertainment, done
// manga and books, done
// login,
// logout,
// account,
// single item, done
// cart,
// Admin Page

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  // set cart????
  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });
  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} token={token} />}
          />
          <Route
            path="/collections/shop-all"
            element={<ShopAll isLoggedIn={isLoggedIn} token={token} />}
          />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/secure/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/logout"
            element={
              <Logout setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/secure/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/order-history" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/admin-page" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
