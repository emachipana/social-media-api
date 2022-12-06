import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register
export const register = async (req, res) => {
  try{
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      occupation
    } = req.body;

    const { originalname: picturePath } = req.file;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picturePath || "default_picture.jpg",
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000)
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err) {
    res.status(422).json({ error: err.message });
  }
}

// logging in
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user = user.toJSON();

    res.json({ ...user, token });
  }catch(err) {
    res.status(422).json({ error: err.message });
  }
}
