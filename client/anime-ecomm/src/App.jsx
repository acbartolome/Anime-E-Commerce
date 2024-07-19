import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

// Routes need
// Home, Shop all, clothing, collectables, home entertainment, manga and books, login, logout, account, single item, cart, Add product,

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
