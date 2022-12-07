import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getFeedPosts,
  getUserPosts,
  likePost
} from "../controllers/posts.js";

const router = Router();

// GET || READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// PATCH || UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;
