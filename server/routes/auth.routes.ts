import express from "express";
import {
  SignInController,
  SignOutController,
  SignUpController,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", SignUpController);

router.post("/signin", SignInController);

router.get("/signout", authenticate, SignOutController);

export default router;
