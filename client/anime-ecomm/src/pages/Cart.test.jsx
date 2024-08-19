import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";

// Mock `useNavigate` from 'react-router-dom'
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Cart Component", () => {
  const mockCart = [
    {
      name: "Product 1",
      description: "Description 1",
      price: 10.0,
      imageUrl: "https://example.com/product1.jpg",
    },
    {
      name: "Product 2",
      description: "Description 2",
      price: 20.0,
      imageUrl: "https://example.com/product2.jpg",
    },
  ];

  const mockSetCart = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    window.alert = jest.fn();
    mockSetCart.mockReset();
    localStorage.clear();
  });

  test("renders cart with items and handles removal", async () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} setCart={mockSetCart} isLoggedIn={true} />
      </MemoryRouter>
    );

    // Ensure both items are displayed
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    // Remove the first item
    fireEvent.click(screen.getAllByText("Remove")[0]);

    // Check if setCart was called with the updated cart
    expect(mockSetCart).toHaveBeenCalledWith([mockCart[1]]);
  });

  test("shows empty cart message when no items are present", () => {
    render(
      <MemoryRouter>
        <Cart cart={[]} setCart={mockSetCart} isLoggedIn={true} />
      </MemoryRouter>
    );

    // Ensure empty cart message is displayed
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  test("handles checkout when user is logged in", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} setCart={mockSetCart} isLoggedIn={true} />
      </MemoryRouter>
    );

    // Click the checkout button
    fireEvent.click(screen.getByText("Checkout"));

    // Ensure navigate is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });

  test("alerts and redirects to login when user is not logged in during checkout", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} setCart={mockSetCart} isLoggedIn={false} />
      </MemoryRouter>
    );

    // Click the checkout button
    fireEvent.click(screen.getByText("Checkout"));

    // Ensure alert is shown and navigate is called with the login path
    expect(window.alert).toHaveBeenCalledWith("Please log in to checkout");
    expect(mockNavigate).toHaveBeenCalledWith("/secure/login");
  });
});
