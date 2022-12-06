import formatFriends from "../helpers/formatFriends.js";
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

    const formattedFriends = await formatFriends(User, user);

    res.json(formattedFriends);
  }catch(err) {
    res.status(404).json({ error: err.message });
  }
}

// PATCH || UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if(!user || !friend) return res.status(404).json({ message: "User does not exist." });

    if(user.friends.includes(friendId)) {
      // remove friend
      user.friends = user.friends.filter((id) => id !== friend);
      friend.friends = friend.friends.filter((userId) => userId !== id);
    }else {
      // add friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const formattedFriends = await formatFriends(User, user);

    res.json(formattedFriends);
  }catch(err) {
    res.status(500).json({ error: err.message });
  }
}
