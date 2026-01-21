import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";
import authRoutes  from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js" 
import taskRoutes from "./routes/taskRoutes.js"
import User from "./models/User.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth" ,authRoutes );
app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
