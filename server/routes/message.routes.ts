import express from "express";
import {
  GetMessagesController,
  SendMessageController,
} from "../controllers/message.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/send/:id", authenticate, SendMessageController);
router.get("/:id", authenticate, GetMessagesController);

export default router;
