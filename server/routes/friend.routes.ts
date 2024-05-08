import express from "express";
import {
  AcceptFriendController,
  AddFriendCController,
  GetFriendsController,
  RemoveFriendController,
} from "../controllers/friend.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/addfriend", authenticate, AddFriendCController);

router.post("/acceptfriend", authenticate, AcceptFriendController);

router.get("/:id", authenticate, GetFriendsController);

router.post("/removefriend/:id", authenticate, RemoveFriendController);

export default router;
