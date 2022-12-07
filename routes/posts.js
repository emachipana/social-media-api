import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getFeedPosts,
  getUserPosts
} from "../controllers/posts.js";

const router = Router();

// GET || READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

export default router;
