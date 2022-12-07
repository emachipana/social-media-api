import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  commentPost
} from "../controllers/posts.js";

const router = Router();

// GET || READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// PATCH || UPDATE
router.patch("/:id/like", verifyToken, likePost);

// POST || CREATE
router.post("/:id/comment", verifyToken, commentPost);

export default router;
