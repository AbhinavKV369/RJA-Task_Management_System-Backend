import express from "express";
import {
  handleCreateEmployee,
  handleDeleteEmployee,
  handleGetEmployee,
  handleUpdateEmployee,
} from "../controllers/userController.js";
import { authProtect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.use(authProtect, adminOnly);

router.get("/", handleGetEmployee);
router.get("/:id", handleGetEmployee);
router.post("/", handleCreateEmployee);
router.put("/:id", handleUpdateEmployee);
router.delete("/:id", handleDeleteEmployee);

export default router;
