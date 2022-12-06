import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend
} from "../controllers/users.js";

const router = Router();

// GET || READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// PATCH || UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
