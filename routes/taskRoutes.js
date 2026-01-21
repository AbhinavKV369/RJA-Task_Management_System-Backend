import express from "express";
import { authProtect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import {
  handleGetTasks,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authProtect, handleGetTasks);
router.post("/", authProtect, adminOnly, handleCreateTask);
router.delete("/:id", authProtect, adminOnly, handleDeleteTask);
router.put("/:id", authProtect, handleUpdateTask);

export default router;
