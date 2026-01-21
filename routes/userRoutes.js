import express from "express";
import {
  handleCreateEmployee,
  handleDeleteEmployee,
  handleGetEmployee,
  handleGetEmployees,
  handleUpdateEmployee,
} from "../controllers/userController.js";
import { authProtect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authProtect, adminOnly);

router.get("/", handleGetEmployees);  
router.get("/:id", handleGetEmployee);
router.post("/", handleCreateEmployee);
router.put("/:id", handleUpdateEmployee);
router.delete("/:id", handleDeleteEmployee);

export default router;
