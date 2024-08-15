import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleProduct from "./SingleProduct";
import { useNavigate, useParams } from "react-router-dom";

// Mock `react-router-dom`
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: () => ({ productId: "1" }),
}));

describe("SingleProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1,
            name: "Product 1",
            price: 29.99,
            imageUrl: "http://example.com/product1.jpg",
            description: "A very cool product",
          }),
      })
    );

    // Suppress console logs
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders product details after fetching", async () => {
    render(<SingleProduct cart={[]} setCart={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("$29.99")).toBeInTheDocument();
      expect(screen.getByText("A very cool product")).toBeInTheDocument();
    });
  });
});
