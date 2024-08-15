import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

// Mock the `useNavigate` hook from `react-router-dom`
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Logout Component", () => {
  let navigateMock;
  const setIsLoggedInMock = jest.fn();
  const setTokenMock = jest.fn();
  const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    removeItemSpy.mockClear(); // Clear previous calls to removeItem
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls setToken with null and setIsLoggedIn with false", () => {
    render(
      <Logout setIsLoggedIn={setIsLoggedInMock} setToken={setTokenMock} />
    );

    expect(setTokenMock).toHaveBeenCalledWith(null);
    expect(setIsLoggedInMock).toHaveBeenCalledWith(false);
  });

  test("removes token from localStorage", () => {
    render(
      <Logout setIsLoggedIn={setIsLoggedInMock} setToken={setTokenMock} />
    );

    expect(removeItemSpy).toHaveBeenCalledWith("token");
  });

  test("navigates to home page", () => {
    render(
      <Logout setIsLoggedIn={setIsLoggedInMock} setToken={setTokenMock} />
    );

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
