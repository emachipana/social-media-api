import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { handleNotFound } from "./middleware/handleNotFound.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { posts, users } from "./data/index.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/assets");
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", [ verifyToken, upload.single("picture") ], createPost);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// handle endpoints not found
app.use(handleNotFound);

// mongoose setup
const PORT = process.env.PORT || 3002;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  
    // ADD DATA ONE TIME
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => {
    console.error(`${err} did not connect`);
  });
