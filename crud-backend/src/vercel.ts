import type { Request, Response } from "express";
import app from "./app";
import { connectDatabase } from "./config/database";

export default async function handler(req: Request, res: Response) {
  await connectDatabase();
  return app(req, res);
}
