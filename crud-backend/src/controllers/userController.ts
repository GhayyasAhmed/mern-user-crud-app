import { Request, Response } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { createAppError } from "../utils/createAppError";
import { toUserResponse } from "../utils/toUserResponse";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    message: "Users fetched successfully",
    data: users.map((user) => toUserResponse(user)),
    success: true,
    status: 200,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createAppError("User not found", 404);
  }

  res.status(200).json({
    message: "User fetched successfully",
    data: toUserResponse(user),
    success: true,
    status: 200,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const user = await User.create({ name, email, age });

  res.status(201).json({
    message: "User created successfully",
    data: toUserResponse(user),
    success: true,
    status: 201,
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, age },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw createAppError("User not found", 404);
  }

  res.status(200).json({
    message: "User updated successfully",
    data: toUserResponse(user),
    success: true,
    status: 200,
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw createAppError("User not found", 404);
  }

  res.status(200).json({
    message: "User deleted successfully",
    success: true,
    status: 200,
  });
});
