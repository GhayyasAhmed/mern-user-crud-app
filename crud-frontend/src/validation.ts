import type { UserType } from "./types";

type UserFormValues = Pick<UserType, "name" | "email" | "age">;

export interface UserFormFieldErrors {
  name?: string;
  email?: string;
  age?: string;
}

export function getUserFormErrors(values: UserFormValues): UserFormFieldErrors {
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const age = Number(values.age);
  const errors: UserFormFieldErrors = {};

  if (!trimmedName) {
    errors.name = "Name is required.";
  }

  if (trimmedName && trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (Number.isNaN(age)) {
    errors.age = "Age is required.";
  } else if (!Number.isInteger(age) || age < 1 || age > 120) {
    errors.age = "Age must be a whole number between 1 and 120.";
  }

  return errors;
}

export function validateUserForm(values: UserFormValues): string {
  const errors = getUserFormErrors(values);
  return errors.name || errors.email || errors.age || "";
}
