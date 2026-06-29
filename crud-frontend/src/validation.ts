import type { UserType } from "./types";

type UserFormValues = Pick<UserType, "name" | "email" | "age">;

export function validateUserForm(values: UserFormValues): string {
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const age = Number(values.age);

  if (!trimmedName || !trimmedEmail || Number.isNaN(age)) {
    return "Name, email, and age are required.";
  }

  if (trimmedName.length < 2) {
    return "Name must be at least 2 characters long.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    return "Age must be a whole number between 1 and 120.";
  }

  return "";
}
