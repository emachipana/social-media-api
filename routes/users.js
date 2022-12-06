import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import {
  getUser,
  getUserFriends,
  addRemoveFriend
} from "../controllers/users.js";

const router = Router();

// GET | READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
