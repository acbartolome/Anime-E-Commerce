import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import Account from "./pages/Account";
import AdminPage from "./pages/AdminPage";
import Cart from "./pages/Cart";
import Clothing from "./pages/Clothing";
import Collectables from "./pages/Collectables";
import HomeEntertainment from "./pages/HomeEntertainment";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import MangaBooks from "./pages/MangaBooks";
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
          <Route path="/products/:id" element={<SingleProduct />} />
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
