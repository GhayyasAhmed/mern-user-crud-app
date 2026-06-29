import cors from "cors";
import express from "express";
import { env } from "./config/env";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin is not allowed"));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Backend is running",
    success: true,
    status: 200,
  });
});

app.use("/api/users", userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
