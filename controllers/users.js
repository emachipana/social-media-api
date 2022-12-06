import User from "../models/User.js";

// GET || READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ message: "User does not exist." });

    res.json(user);
  }catch(err) {
    res.status(404).json({ error: err.message });
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ message: "User does not exist." });

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map((friend) => {
      const {friends, ...user} = friend.toJSON();
      return user;
    });

    res.json(formattedFriends);
  }catch(err) {
    res.status(404).json({ error: err.message });
  }
}

export const addRemoveFriend = () => "";
