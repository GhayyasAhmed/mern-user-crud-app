import { describe, expect, it } from "vitest";
import { getUserFormErrors } from "./validation";

describe("getUserFormErrors", () => {
  it("returns field errors for empty values", () => {
    expect(
      getUserFormErrors({
        name: "",
        email: "",
        age: Number(""),
      }),
    ).toEqual({
      name: "Name is required.",
      email: "Email is required.",
      age: "Age must be a whole number between 1 and 120.",
    });
  });

  it("accepts a valid user form", () => {
    expect(
      getUserFormErrors({
        name: "Ayesha",
        email: "ayesha@example.com",
        age: 27,
      }),
    ).toEqual({});
  });

  it("flags invalid email and out-of-range age", () => {
    expect(
      getUserFormErrors({
        name: "Ali",
        email: "wrong-email",
        age: 121,
      }),
    ).toEqual({
      email: "Enter a valid email address.",
      age: "Age must be a whole number between 1 and 120.",
    });
  });
});
