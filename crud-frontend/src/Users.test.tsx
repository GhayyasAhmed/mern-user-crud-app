import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Users from "./Users";

const mockFetchUsersFromApi = vi.fn();

vi.mock("./api", () => ({
  api: {
    delete: vi.fn(),
  },
  fetchUsers: () => mockFetchUsersFromApi(),
  getErrorMessage: (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback,
}));

vi.mock("./notifications", () => ({
  getFlashMessage: vi.fn(() => null),
}));

describe("Users", () => {
  beforeEach(() => {
    mockFetchUsersFromApi.mockReset();
  });

  it("renders fetched users", async () => {
    mockFetchUsersFromApi.mockResolvedValue([
      { id: "1", name: "Ayesha", email: "ayesha@example.com", age: 24 },
    ]);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading users...")).toBeInTheDocument();

    await screen.findByText("Ayesha");
    expect(screen.getByText("ayesha@example.com")).toBeInTheDocument();
  });

  it("renders empty state when no users exist", async () => {
    mockFetchUsersFromApi.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

    await screen.findByText("No users found yet.");
  });

  it("shows an error and retries loading", async () => {
    mockFetchUsersFromApi
      .mockRejectedValueOnce(new Error("Network down"))
      .mockResolvedValueOnce([
        { id: "2", name: "Sara", email: "sara@example.com", age: 31 },
      ]);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

    await screen.findByText("Network down");

    await userEvent.click(screen.getByRole("button", { name: "Retry" }));

    await waitFor(() => {
      expect(screen.getByText("Sara")).toBeInTheDocument();
    });
  });
});
