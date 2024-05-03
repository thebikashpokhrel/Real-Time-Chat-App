import express, { Request, Response } from "express";
import {
  SignInController,
  SignOutController,
  SignUpController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", SignUpController);

router.post("/signin", SignInController);

router.post("/signout", SignOutController);

export default router;
