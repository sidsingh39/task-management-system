import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask
} from "../controllers/task.controller";

const router = Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTaskById);
router.patch("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);
router.patch("/:id/toggle", authenticate, toggleTask);

export default router;
