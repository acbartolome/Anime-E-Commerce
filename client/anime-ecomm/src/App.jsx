// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage/HomePage";
// import Account from "./pages/Account";
// import AdminPage from "./pages/AdminPage";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Logout from "./components/Logout";
// import OrderHistory from "./pages/OrderHistory";
// import Register from "./pages/Register";
// import ShopAll from "./pages/ShopAll/ShopAll";
// import SingleProduct from "./pages/SingleProduct/SingleProduct";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   // const [admin, setAdmin] = useState();
//   // const [isLoggedIn, setIsLoggedIn] = useState(!!token);
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   })
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart])

//   const handleLogout = () => {
//     setToken(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem("token");
//     navigate('/');
//   }

//   return (
//     <>
//       <Router>
//         <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//         <Routes>
//           <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} token={token} />} />
//           <Route path="/collections/shop-all" element={<ShopAll cart={cart} setCart={setCart} token={token} />} />
//           <Route path="/products/:id" element={<SingleProduct cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
//           <Route path="/secure/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/secure/register" element={<Register />} />
//           <Route path="/account" element={<Account token={token} cart={cart} />} />
//           <Route path="/account/order-history" element={<OrderHistory />} />
//           <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
//           <Route path="/auth/admin-page" element={<AdminPage />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage/HomePage";
// import Account from "./pages/Account";
// import AdminPage from "./pages/AdminPage";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Logout from "./components/Logout";
// import OrderHistory from "./pages/OrderHistory";
// import Register from "./pages/Register";
// import ShopAll from "./pages/ShopAll/ShopAll";
// import SingleProduct from "./pages/SingleProduct/SingleProduct";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!token);
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <Router>
//       <NavBar isLoggedIn={isLoggedIn} />
//       <AppContent
//         token={token}
//         setToken={setToken}
//         isLoggedIn={isLoggedIn}
//         setIsLoggedIn={setIsLoggedIn}
//         cart={cart}
//         setCart={setCart}
//       />
//     </Router>
//   );
// }

// function AppContent({ token, setToken, isLoggedIn, setIsLoggedIn, cart, setCart }) {
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   setToken(null);
//   //   setIsLoggedIn(false);
//   //   localStorage.removeItem("token");
//   //   navigate('/');
//   // };

//   return (
//     <Routes>
//       <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} token={token} />} />
//       <Route path="/collections/shop-all" element={<ShopAll cart={cart} setCart={setCart} token={token} />} />
//       <Route path="/products/:id" element={<SingleProduct cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
//       <Route path="/secure/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/logout" element={<Logout />} />
//       <Route path="/secure/register" element={<Register />} />
//       <Route path="/account" element={<Account token={token} cart={cart} />} />
//       <Route path="/account/order-history" element={<OrderHistory />} />
//       <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
//       <Route path="/auth/admin-page" element={<AdminPage />} />
//     </Routes>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
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

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   setToken(null);
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("token");
  //   navigate('/');
  // };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} token={token} />} />
        <Route path="/collections/shop-all" element={<ShopAll cart={cart} setCart={setCart} token={token} />} />
        <Route path="/products/:id" element={<SingleProduct cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
        <Route path="/secure/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/secure/register" element={<Register />} />
        <Route path="/account" element={<Account token={token} cart={cart} />} />
        <Route path="/account/order-history" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
        <Route path="/auth/admin-page" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

// function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

export default App;
