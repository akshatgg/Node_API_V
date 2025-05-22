import { rateLimit } from "express-rate-limit";
import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import router from "./routes";
import path from "path";

config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 8000;
console.log("PORT" + PORT);

export const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true); // in case this is behind apache or nginx or whatever

// Handle CORS
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.CLIENT_URL as string,
      "https://itaxeasy-chi.vercel.app",
      "http://localhost:3000",
      "https://itaxeasy.com",
      "https://itax-ssr.vercel.app",
      "https://api.sandbox.co.in",
      "https://backend.itaxeasy.com",
      "https://api.itaxeasy.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);


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

// app.use((req: Request, res: Response, next: NextFunction) => {

//   if (req.headers["x-ssr-ip"]) {
//     console.log("hi")
//     req.ip = req.headers["x-ssr-ip"] as string;
//   }
//   next();
// });


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // maximum 100 requests per windowMs

});

app.use(helmet());
app.use(cookieParser());




app.use(limiter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Internal Server Error" });
});

app.use(router);

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
