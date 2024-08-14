import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";
import userEvent from "@testing-library/user-event";

// Mock the entire react-bootstrap library
jest.mock("react-bootstrap", () => {
  const originalModule = jest.requireActual("react-bootstrap");
  return {
    __esModule: true,
    ...originalModule,
    Button: ({ children }) => <button>{children}</button>,
    Container: ({ children }) => <div>{children}</div>,
    Form: ({ children }) => <form>{children}</form>,
    Nav: ({ children }) => <nav>{children}</nav>,
    Navbar: ({ children, expand }) => (
      <div className={`navbar-expand-${expand}`}>{children}</div>
    ),
    NavDropdown: ({ title, children }) => (
      <div>
        <div>{title}</div>
        <div>{children}</div>
      </div>
    ),
  };
});

describe("NavBar Component", () => {
  const renderNavBar = (props) => {
    return render(<NavBar {...props} />);
  };

  test("renders all basic navigation links", () => {
    renderNavBar({});
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop All")).toBeInTheDocument();
    expect(screen.getByText("Collectables")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
    expect(screen.getByText("Home Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Manga & Books")).toBeInTheDocument();
  });

  test("shows Login and Register links when not logged in", () => {
    renderNavBar({ isLoggedIn: false });
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.queryByText("My Account")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("shows User dropdown and Cart link when logged in", async () => {
    renderNavBar({ isLoggedIn: true, id: 1, admin: false });

    // Simulate clicking on the dropdown toggle
    userEvent.click(screen.getByText("User"));

    expect(await screen.findByText("My Account")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  test("shows Admin Dashboard link when logged in as admin", async () => {
    renderNavBar({ isLoggedIn: true, id: 1, admin: true });

    // Simulate clicking on the dropdown toggle
    userEvent.click(screen.getByText("User"));

    expect(await screen.findByText("Admin Dashboard")).toBeInTheDocument();
  });

  test("does not show Admin Dashboard link when not an admin", () => {
    renderNavBar({ isLoggedIn: true, id: 1, admin: false });
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  test("renders search form with input and button", () => {
    renderNavBar({});
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
