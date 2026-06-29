import { NextFunction, Request, Response } from "express";

type Validator = (req: Request) => string[];

export function validateRequest(validator: Validator) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validator(req);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
        success: false,
        status: 400,
      });
    }

    next();
  };
}
