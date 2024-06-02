const db = require('../database/index.js');


exports.followUser = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    const follow = await Follow.create({ follower_id, following_id });
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: 'Error following user' });
  }
};

exports.unfollowUser = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    await Follow.destroy({ where: { follower_id, following_id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};
