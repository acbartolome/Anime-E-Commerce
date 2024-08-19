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

  test("renders register form and handles successful registration", async () => {
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

    render(
      <MemoryRouter>
        <Register setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    // Use 'getByPlaceholderText' to select input fields by their placeholder text
    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Use 'getByRole' to select the button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            email: "test@example.com",
            password: "password123",
          }),
        }
      );

      // Ensure that the mock functions are called with the correct values
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    // Ensure localStorage is updated correctly
    expect(localStorage.getItem("token")).toBe("mocked_token");
    expect(localStorage.getItem("admin")).toBe(
      mockResponse.user.admin.toString()
    );
    expect(localStorage.getItem("id")).toBe(mockResponse.user.id.toString());
    // Ensure alert is called
    expect(window.alert).toHaveBeenCalledWith(
      "Successfully created an account"
    );
  });

  test("handles registration with existing email", async () => {
    const mockErrorResponse = {
      message: "Email already exists",
    };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => mockErrorResponse,
    });

    const setIsLoggedIn = jest.fn();

    render(
      <MemoryRouter>
        <Register setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    // Use 'getByPlaceholderText' to select input fields by their placeholder text
    fireEvent.change(screen.getByPlaceholderText("name@example.com"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Use 'getByRole' to select the button
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://anime-ecomm-database-7caa7cadec94.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            email: "existing@example.com",
            password: "password123",
          }),
        }
      );

      expect(setIsLoggedIn).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith("Email already exists");
  });
});
