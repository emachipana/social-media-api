async function formatFriends(model, user) {
  const friends = await Promise.all(
    user.friends.map((id) => model.findById(id))
  );

  return friends.map((friend) => {
    const {friends, ...user} = friend.toJSON();
    return user;
  });
}

export default formatFriends;
