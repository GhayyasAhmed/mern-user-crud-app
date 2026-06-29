import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

interface ErrorWithStatus extends Error {
  statusCode?: number;
}

export function errorHandler(
  error: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid resource ID",
      success: false,
      status: 400,
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || "Internal server error",
    success: false,
    status: statusCode,
  });
}
