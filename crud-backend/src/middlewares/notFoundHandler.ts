import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
    success: false,
    status: 404,
  });
}
