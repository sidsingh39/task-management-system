import taskRoutes from "./routes/task.routes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Task Management API is running 🚀");
});

// Auth routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Protected route
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You are authorized",
    userId: (req as any).userId
  });
});

// IMPORTANT: listen must always be LAST
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
