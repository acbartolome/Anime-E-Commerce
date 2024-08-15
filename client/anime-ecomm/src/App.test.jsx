import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the components used in App.jsx
jest.mock("./components/NavBar", () => () => <div>NavBar</div>);
jest.mock("./pages/HomePage/HomePage", () => () => <div>HomePage</div>);
jest.mock("./pages/Account", () => () => <div>Account Page</div>);
jest.mock("./pages/AdminPage", () => () => <div>Admin Page</div>);
jest.mock("./pages/Cart", () => () => <div>Cart Page</div>);
jest.mock("./pages/Login", () => () => <div>Login Page</div>);
jest.mock("./components/Logout", () => () => <div>Logout</div>);
jest.mock("./pages/OrderHistory", () => () => <div>Order History</div>);
jest.mock("./pages/Register", () => () => <div>Register Page</div>);
jest.mock("./pages/ShopAll/ShopAll", () => () => <div>Shop All</div>);
jest.mock("./pages/SingleProduct/SingleProduct", () => () => (
  <div>Single Product</div>
));

describe("App Routing", () => {
  test("renders the HomePage component at the root path", () => {
    render(<App />);
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });

  test("renders the ShopAll component at /collections/shop-all path", () => {
    window.history.pushState({}, "ShopAll test", "/collections/shop-all");
    render(<App />);
    expect(screen.getByText("Shop All")).toBeInTheDocument();
  });

  test("renders the SingleProduct component at /products/:id path", () => {
    window.history.pushState({}, "SingleProduct test", "/products/1");
    render(<App />);
    expect(screen.getByText("Single Product")).toBeInTheDocument();
  });

  test("renders the Login component at /secure/login path", () => {
    window.history.pushState({}, "Login test", "/secure/login");
    render(<App />);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders the Register component at /secure/register path", () => {
    window.history.pushState({}, "Register test", "/secure/register");
    render(<App />);
    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });

  test("renders the AdminPage component at /auth/admin-page path", () => {
    window.history.pushState({}, "AdminPage test", "/auth/admin-page");
    render(<App />);
    expect(screen.getByText("Admin Page")).toBeInTheDocument();
  });
});
