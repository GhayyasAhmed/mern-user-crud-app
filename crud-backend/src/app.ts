import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

app.use(cors());
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
