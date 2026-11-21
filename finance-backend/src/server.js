import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import transactionsRouter from "./routes/transactions.js";
import goalRouter from "./routes/Goal.routes.js";
import globalRouter from "./routes/settings.routes.js";
import userRouter from "./routes/user.routes.js";
import assistanRouter from "./routes/assistant.routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        /\.vercel\.app$/, // allow ANY Vercel deployment
      ];

      if (!origin) {
        return callback(null, true);
      }

      const isAllowed = allowed.some((rule) => {
        if (rule instanceof RegExp) return rule.test(origin);
        return rule === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(express.json());
// AUTH ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
// TRANSACTION ROUTES
app.use("/api/settings", globalRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/goals", goalRouter);
app.use("/api/assistant", assistanRouter);
app.listen(3000, () => {
  console.log("Finance backend running on port 3000");
});
console.log("backend ready fro requests");

console.log("JWT_SECRET:", process.env.JWT_SECRET);
