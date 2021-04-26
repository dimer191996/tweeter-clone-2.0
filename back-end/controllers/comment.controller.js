const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ID = require("mongoose").Types.ObjectId;

module.exports.createComment = async (req, res) => {
  if (!ID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          comments: {
            creatorId: req.body.creatorId,
            creator: req.body.creator,
            body: req.body.body,
            likes: [],
            replies: [],
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send({ docs });
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.updateComment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;
  const body = req.body.body;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID)) {
    return res.status(400).send("ID unknown :" + post_ID);
  }
  try {
    return PostModel.findById(post_ID, (err, docs) => {
      const comment = docs.comments.find((comment) =>
        comment._id.equals(comment_ID)
      );
      if (!comment) return res.status(404).send("comment not found" + err);
      comment.body = body;
      return docs.save((err, docs) => {
        if (!err) return res.status(200).send(docs);
        return res.status(400).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.deleteComment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID)) {
    return res.status(400).send("ID unknown :" + post_ID + "-" + comment_ID);
  }
  try {
    await PostModel.findByIdAndUpdate(
      post_ID,
      {
        $pull: { comments: { _id: comment_ID } },
      },
      { new: true },
      (err, doc) => {
        if (!err) return res.status(200).send(doc);
        return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
