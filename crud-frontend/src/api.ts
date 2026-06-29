import axios from "axios";
import type { UserType } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:3001";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function isUserRecord(value: unknown): value is UserType {
  if (!value || typeof value !== "object") {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.age === "number"
  );
}

function extractDataField(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") {
    throw new Error("Server returned an invalid response.");
  }

  return (payload as { data?: unknown }).data;
}

export async function fetchUsers(): Promise<UserType[]> {
  const response = await api.get("/users");
  const data = extractDataField(response.data);

  if (!Array.isArray(data) || !data.every(isUserRecord)) {
    throw new Error("Server returned an invalid users list.");
  }

  return data;
}

export async function fetchUserById(id: string): Promise<UserType> {
  const response = await api.get(`/users/${id}`);
  const data = extractDataField(response.data);

  if (!isUserRecord(data)) {
    throw new Error("Server returned an invalid user record.");
  }

  return data;
}
