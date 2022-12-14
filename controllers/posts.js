import Post from "../models/Post.js";
import User from "../models/User.js";

// POST || CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: "User does not exist." });

    const newPost = new Post({
      userId,
      description,
      userName: `${user.firstName} ${user.lastName}`,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath: req.file?.originalname,
      likes: {}
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  }catch(err) {
    res.status(422).json({ error: err.message });
  }
}

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findById(id);
    if(!post) return res.status(404).json({ message: "Post not found" });

    if(!content) return res.status(422).json({ message: "Content of comment is required" });
    post.comments.push(content);
    await post.save();

    res.status(201).json(post);
  }catch(err) {
    res.status(422).json({ error: err.message });
  }
}

// GET || READ
export const getFeedPosts = async (_req, res) => {
  try {
    let posts = await Post.find();
    posts = posts.reverse();

    res.json(posts);
  }catch(err) {
    res.status(500).json({ error: err.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    let posts = await Post.find({ userId });
    posts = posts.reverse();

    res.json(posts);
  }catch(err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH || UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if(!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.get(userId);
    if(isLiked) {
      // remove like
      post.likes.delete(userId);
    }else {
      // add like
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.json(updatedPost);
  }catch(err) {
    res.status(404).json({ error: err.message });
  }
}
