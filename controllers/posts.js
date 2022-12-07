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

// GET || READ
export const getFeedPosts = async (_req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  }catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getUserPosts = () => "";
// export const likePost = () => "";
