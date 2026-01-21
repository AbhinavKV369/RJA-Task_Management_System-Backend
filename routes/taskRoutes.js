import express from "express";
import { authProtect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { handleCreateTask, handleDeleteTask, handleGetTasks, handleUpdateTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", authProtect,handleGetTasks);
router.post("/", authProtect, adminOnly,handleCreateTask);
router.put("/:id", authProtect,handleUpdateTask);
router.delete("/:id", authProtect, adminOnly,handleDeleteTask);

export default router;
