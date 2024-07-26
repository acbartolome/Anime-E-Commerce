import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import AdminPage from "./components/AdminPage";
import Cart from "./components/Cart";
import Clothing from "./components/Clothing";
import Collectables from "./components/Collectables";
import HomeEntertainment from "./components/HomeEntertainment";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MangaBooks from "./components/MangaBooks";
import OrderHistory from "./components/OrderHistory";
import Register from "./components/Register";
import ShopAll from "./components/ShopAll";
import SingleProducts from "./components/SingleProduct";

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
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/shop-all" element={<ShopAll />} />
          <Route path="/collections/collectables" element={<Collectables />} />
          <Route path="/collections/clothing" element={<Clothing />} />
          <Route
            path="/collections/home-entertainment"
            element={<HomeEntertainment />}
          />
          <Route path="/collections/manga-books" element={<MangaBooks />} />
          <Route path="/products/:id" element={<SingleProducts />} />
          <Route path="/secure/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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
