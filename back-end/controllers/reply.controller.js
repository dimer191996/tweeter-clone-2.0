const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ID = require("mongoose").Types.ObjectId;

module.exports.createReply = async (req, res) => {
  const post_ID = req.params.id;
  const user_ID = req.body.creatorId;
  const user_NAME = req.body.creatorName;
  const comment_ID = req.body.commentId;
  const body = req.body.body;

  if (!ID.isValid(user_ID) && !ID.isValid(post_ID) && !ID.isValid(comment_ID)) {
    return res.status(400).send("ID unknown");
  }
};
module.exports.updateReply = async (req, res) => {};
module.exports.deleteReply = async (req, res) => {};
