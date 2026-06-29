import "dotenv/config";

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readOrigins(value: string | undefined): string[] {
  if (!value) {
    return ["http://localhost:5173"];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: readNumber(process.env.PORT, 3001),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/crud-backend",
  allowedOrigins: readOrigins(process.env.FRONTEND_URLS),
};
