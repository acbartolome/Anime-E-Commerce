import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Account from "./Account";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock the `fetch` function used in the component
global.fetch = jest.fn();

// Mock the useParams hook to return a specific id
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "123",
  }),
}));

describe("Account Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    fetch.mockReset();
    // Mock token in localStorage
    localStorage.setItem("token", "mocked_token");
  });

  test("renders account information and allows editing", async () => {
    // Mock user data
    const mockUser = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    // Mock fetch response for user data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    // Render the component with MemoryRouter for testing
    render(
      <MemoryRouter initialEntries={["/account/123"]}>
        <Routes>
          <Route
            path="/account/:id"
            element={<Account token="mocked_token" />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Wait for data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("***********")).toBeInTheDocument();
    });

    // Open the modal
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    // Verify that modal elements are present
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    // Mock the updated user data
    const updatedUser = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    };

    // Mock fetch response for updating user data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedUser,
    });

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: updatedUser.name },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: updatedUser.email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "newpassword123" },
    });

    // Click the Save Changes button
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    // Wait for the modal to close
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    // Verify that user information has been updated
    await waitFor(() => {
      expect(screen.getByText(updatedUser.name)).toBeInTheDocument();
      expect(screen.getByText(updatedUser.email)).toBeInTheDocument();
    });
  });
});
