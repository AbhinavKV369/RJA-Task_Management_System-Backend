import express from "express";
import { handleLoginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",handleLoginUser);

export default router; 