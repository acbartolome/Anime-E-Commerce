import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AdminPage from "./AdminPage";

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch;
});

describe("AdminPage Component", () => {
  const mockUsersData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  const mockProductsData = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 10.0,
      imageUrl: "https://example.com/product1.jpg",
      category: "Category 1",
      stock: 100,
    },
  ];

  beforeEach(() => {
    mockFetch.mockImplementation((url) => {
      if (url.includes("/users")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUsersData),
        });
      } else if (url.includes("/product")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockProductsData),
        });
      }
    });
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  test("renders AdminPage component", async () => {
    render(
      <BrowserRouter>
        <AdminPage admin={true} isLoggedIn={true} />
      </BrowserRouter>
    );

    // Check if users and products are displayed
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
  });

  test("creates a product", async () => {
    render(
      <BrowserRouter>
        <AdminPage admin={true} isLoggedIn={true} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Add product"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "20.0" },
    });
    fireEvent.change(screen.getByPlaceholderText("url"), {
      target: { value: "https://example.com/new-product.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "New Category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock"), {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByText("Add Product"));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/product"),
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });

  test("edits a product", async () => {
    render(
      <BrowserRouter>
        <AdminPage admin={true} isLoggedIn={true} />
      </BrowserRouter>
    );

    // Wait for the products to load
    await screen.findByText("Product 1");

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Updated Product" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/product/1"),
        expect.objectContaining({
          method: "PATCH",
        })
      );
    });
  });

  test("deletes a product", async () => {
    render(
      <BrowserRouter>
        <AdminPage admin={true} isLoggedIn={true} />
      </BrowserRouter>
    );

    await screen.findByText("Product 1");

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/product/1"),
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });
  });
});
