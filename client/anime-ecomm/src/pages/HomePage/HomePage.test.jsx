import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

// Mock the `useNavigate` hook from `react-router-dom`
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("HomePage Component", () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders carousel with images and captions", () => {
    render(<HomePage />);

    // Check that carousel captions are present
    expect(screen.getByText("First slide label")).toBeInTheDocument();
    expect(screen.getByText("Second slide label")).toBeInTheDocument();
    expect(screen.getByText("Third slide label")).toBeInTheDocument();
  });

  test("renders homepage header correctly", () => {
    render(<HomePage />);
    expect(
      screen.getByText("EXPLORE OUR AMAZING SELECTION OF ANIME")
    ).toBeInTheDocument();
  });

  test("navigates to correct route when category image is clicked", () => {
    render(<HomePage />);

    // Check if images are present
    expect(screen.getByAltText("Collectables")).toBeInTheDocument();
    expect(screen.getByAltText("Clothing")).toBeInTheDocument();
    expect(screen.getByAltText("Home Entertainment")).toBeInTheDocument();
    expect(screen.getByAltText("Manga & Books")).toBeInTheDocument();

    // Simulate click on category images
    screen.getByAltText("Collectables").click();
    expect(navigateMock).toHaveBeenCalledWith(
      "/collections/shop-all?category=collectables"
    );

    screen.getByAltText("Clothing").click();
    expect(navigateMock).toHaveBeenCalledWith(
      "/collections/shop-all?category=clothing"
    );

    screen.getByAltText("Home Entertainment").click();
    expect(navigateMock).toHaveBeenCalledWith(
      "/collections/shop-all?category=home-entertainment"
    );

    screen.getByAltText("Manga & Books").click();
    expect(navigateMock).toHaveBeenCalledWith(
      "/collections/shop-all?category=manga-books"
    );
  });
});
