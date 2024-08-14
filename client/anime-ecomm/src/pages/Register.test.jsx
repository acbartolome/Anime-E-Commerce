import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";

// Mock the `fetch` function used in the component
global.fetch = jest.fn();

// Mock `useNavigate` from 'react-router-dom'
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {
  beforeEach(() => {
    fetch.mockReset();
    mockNavigate.mockReset();
    window.alert = jest.fn();
  });

  test("renders registration form and handles successful registration", async () => {
    const mockResponse = {
      token: "mocked_token",
      user: {
        id: 1,
        admin: false,
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const setIsLoggedIn = jest.fn();
    const setId = jest.fn();
    const setAdmin = jest.fn();

    render(
      <MemoryRouter>
        <Register
          setToken={jest.fn()}
          setIsLoggedIn={setIsLoggedIn}
          setId={setId}
          setAdmin={setAdmin}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            name: "John Doe",
            password: "password123",
          }),
        }
      );

      expect(setId).toHaveBeenCalledWith(mockResponse.user.id);
      expect(setAdmin).toHaveBeenCalledWith(mockResponse.user.admin);
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    expect(localStorage.getItem("token")).toBe(mockResponse.token);
    expect(window.alert).toHaveBeenCalledWith(
      "Successfully created an account"
    );
  });

  test("handles registration failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Email already exists" }),
    });

    const setIsLoggedIn = jest.fn();
    const setId = jest.fn();
    const setAdmin = jest.fn();

    render(
      <MemoryRouter>
        <Register
          setToken={jest.fn()}
          setIsLoggedIn={setIsLoggedIn}
          setId={setId}
          setAdmin={setAdmin}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            name: "John Doe",
            password: "password123",
          }),
        }
      );

      expect(setId).not.toHaveBeenCalled();
      expect(setAdmin).not.toHaveBeenCalled();
      expect(setIsLoggedIn).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
