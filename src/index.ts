import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import router from "./routes";
import path from "path";

config(
  {
    path: path.resolve(__dirname, "../.env"),
  }
);

const PORT = process.env.PORT || 8080;

export const prisma = new PrismaClient();
const app = express();

// Handle CORS
app.use(cors(
  {
    credentials:true,
    origin:[process.env.CLIENT_URL as string]
  }
))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware to log request status
app.use((req, res, next) => {
  const start = Date.now(); // Timestamp when the request was received
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate duration of request handling
    console.log(
      `[${new Date().toLocaleString()}] ${req.method} ${req.url} - ${
        res.statusCode
      } - ${duration}ms`
    );
  });
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // maximum 100 requests per windowMs
});

app.use(helmet());
app.use(cookieParser());
app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(limiter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Internal Server Error" });
});

app.use(router);

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
