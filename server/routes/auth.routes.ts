import express from "express";
import {
  SignInController,
  SignOutController,
  SignUpController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", SignUpController);

router.post("/signin", SignInController);

router.get("/signout", SignOutController);

export default router;
