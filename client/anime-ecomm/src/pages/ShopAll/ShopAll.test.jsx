import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShopAll from "./ShopAll";
import { useNavigate, useSearchParams } from "react-router-dom";

// Mock `useNavigate` and `useSearchParams` from `react-router-dom`
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useSearchParams: () => [new URLSearchParams({ category: "collectables" })],
}));

describe("ShopAll Component", () => {
  const navigateMock = jest.fn();
  const setCartMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "Product 1",
              price: 29.99,
              imageUrl: "http://example.com/product1.jpg",
            },
            {
              id: 2,
              name: "Product 2",
              price: 39.99,
              imageUrl: "http://example.com/product2.jpg",
            },
          ]),
      })
    );
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("shows loading message when data is being fetched", () => {
    render(<ShopAll cart={[]} setCart={setCartMock} />);

    // Simulate the initial loading state
    expect(screen.getByText("Loading items....")).toBeInTheDocument();
  });

  test("renders products after fetching", async () => {
    render(<ShopAll cart={[]} setCart={setCartMock} />);

    // Wait for the products to be rendered
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("$29.99")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("$39.99")).toBeInTheDocument();
    });
  });

  test("adds product to cart when 'Add to Cart' is clicked", async () => {
    // Adjust the mock fetch response to have only one product
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "Product 1",
              price: 29.99,
              imageUrl: "http://example.com/product1.jpg",
            },
          ]),
      })
    );

    render(<ShopAll cart={[]} setCart={setCartMock} />);

    // Wait for the product to be rendered
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Click the 'Add to Cart' button
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(setCartMock).toHaveBeenCalledWith([
      {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "http://example.com/product1.jpg",
      },
    ]);
  });

  test("navigates to product details page when 'View details' button or image is clicked", async () => {
    // Adjust the mock fetch response to have only one product
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: "Product 1",
              price: 29.99,
              imageUrl: "http://example.com/product1.jpg",
            },
          ]),
      })
    );

    render(<ShopAll cart={[]} setCart={setCartMock} />);

    // Wait for the product to be rendered
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Click the 'View details' button
    fireEvent.click(screen.getByText("View details"));
    expect(navigateMock).toHaveBeenCalledWith("/products/1");

    // Click the product image
    fireEvent.click(screen.getByAltText("Product 1"));
    expect(navigateMock).toHaveBeenCalledWith("/products/1");
  });
});
