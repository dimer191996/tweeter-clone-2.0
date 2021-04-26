const PostModel = require("../models/post.model");
const ID = require("mongoose").Types.ObjectId;

module.exports.like_post = async (req, res) => {
  const post_ID = req.params.id;
  !ID.isValid(post_ID) && res.status(400).send("ID unknown :" + post_ID);

  try {
    const newLike = { likes: req.body.id };
    const addLike = { $addToSet: newLike };
    await PostModel.findByIdAndUpdate(
      post_ID,
      addLike,
      { new: true },
      (err, docs) => {
        !err ? res.status(200).send(docs) : console.log(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unlike_post = async (req, res) => {
  const post_ID = req.params.id;
  !ID.isValid(post_ID) && res.status(400).send("ID unknown :" + post_ID);

  try {
    const newLike = { likes: req.body.id };
    const addLike = { $pull: newLike };
    await PostModel.findByIdAndUpdate(
      post_ID,
      addLike,
      { new: true },
      (err, docs) => {
        !err ? res.status(200).send(docs) : console.log(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.like_comment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;
  const user_ID = req.body.userId;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID) || !ID.isValid(user_ID)) {
    return res
      .status(400)
      .send("ID unknown :" + post_ID + "-" + comment_ID + "-" + user_ID);
  }

  try {
    return PostModel.findById(post_ID, (err, docs) => {
      const comment = docs.comments.find((comment) =>
        comment._id.equals(comment_ID)
      );
      if (!comment) return res.status(404).send(" comment not found: " + err);
      comment.likes.push(user_ID);
      return docs.save((err, docs) => {
        if (!err) return res.status(200).send(docs);
        return res.status(400).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.unlike_comment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;
  const user_ID = req.body.userId;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID) || !ID.isValid(user_ID)) {
    return res
      .status(400)
      .send("ID unknown :" + post_ID + "-" + comment_ID + "-" + user_ID);
  }

  try {
    const post = await PostModel.findById(post_ID);
    if (post) {
      const comment = post.comments.find((c) => c.id === comment_ID);
      if (comment) {
        comment.likes = comment.likes.filter((like) => like !== user_ID);
        await post.save();
        return res.status(200).send(post);
      }
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};
