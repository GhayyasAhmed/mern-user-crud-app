import { Request } from "express";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUserPayload(req: Request) {
  const errors: string[] = [];
  const { name, email, age } = req.body as {
    name?: unknown;
    email?: unknown;
    age?: unknown;
  };

  if (typeof name !== "string") {
    errors.push("Name is required.");
  } else {
    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      errors.push("Name must be between 2 and 50 characters.");
    }
  }

  if (typeof email !== "string") {
    errors.push("Email is required.");
  } else {
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length < 5 || trimmedEmail.length > 100) {
      errors.push("Email must be between 5 and 100 characters.");
    }

    if (!emailPattern.test(trimmedEmail)) {
      errors.push("Email format is invalid.");
    }
  }

  if (typeof age !== "number" || Number.isNaN(age)) {
    errors.push("Age must be a number.");
  } else if (!Number.isInteger(age) || age < 13 || age > 120) {
    errors.push("Age must be a whole number between 13 and 120.");
  }

  return errors;
}

export function validateCreateUser(req: Request) {
  return validateUserPayload(req);
}

export function validateUpdateUser(req: Request) {
  return validateUserPayload(req);
}
