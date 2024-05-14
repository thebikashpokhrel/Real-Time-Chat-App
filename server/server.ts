import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
import { dbConnect } from "./database/dbConfig";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes";
import friendRoutes from "./routes/friend.routes";
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const allowedOrigins =["http://localhost:3000"]
app.use(cors({
  origin:allowedOrigins
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/friend", friendRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server Started at ${PORT}`);
});
