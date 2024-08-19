import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

// Mock the `fetch` function used in the component
global.fetch = jest.fn();

// Mock `useNavigate` from 'react-router-dom'
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    fetch.mockReset();
    mockNavigate.mockReset();
    window.alert = jest.fn();
  });

  test("renders login form and handles successful login", async () => {
    const mockResponse = {
      token: "mocked_token",
      id: 1,
      admin: false,
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const setIsLoggedIn = jest.fn();

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    console.log("Before waiting for expectations");

    await waitFor(() => {
      console.log("Inside waitFor");
      expect(fetch).toHaveBeenCalledWith(
        "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }
      );

      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith(`/account/${mockResponse.id}`);
    });

    expect(localStorage.getItem("token")).toBe(mockResponse.token);
    expect(localStorage.getItem("admin")).toBe(mockResponse.admin.toString());
    expect(localStorage.getItem("id")).toBe(mockResponse.id.toString());
    expect(window.alert).toHaveBeenCalledWith("Successfully Logged in");
  });

  test("handles login failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const setIsLoggedIn = jest.fn();
    const setId = jest.fn();
    const setAdmin = jest.fn();

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }
      );

      expect(setIsLoggedIn).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    expect(window.alert).not.toHaveBeenCalled();
  });
});
