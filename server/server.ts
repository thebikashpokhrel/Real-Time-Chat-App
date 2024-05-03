import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
