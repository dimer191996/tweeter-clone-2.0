import CommentModel from "../models/comment.model.js";
import mongoose from "mongoose";

const ID = mongoose.Types.ObjectId;

export const createComment = async (req, res, next) => {
  if (!ID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (!req.body.body.trim()) {
    res.status(400).send({ error: "Body empty" });
    return next();
  }

  const newComment = new CommentModel({
    postId: req.params.id,
    creatorId: req.body.creatorId,
    creator: req.body.creator,
    body: req.body.body,
    isReady: true,
    isError: false,
    likes: [],
    replies: [],
    timestamp: new Date().getTime(),
  });
  try {
    const comment = await newComment.save();
    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).send({ message: JSON.stringify(err.message) });
  }
};
export const updateComment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;
  const body = req.body.body;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID)) {
    return res.status(400).send("ID unknown :" + post_ID);
  }
  try {
    await CommentModel.findById(comment_ID, (err, doc) => {
      const comment = doc;
      if (!comment) return res.status(404).send("comment not found" + err);
      comment.body = body;
      return doc.save((err, docs) => {
        if (!err) return res.status(200).send(docs);
        return res.status(400).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
export const deleteComment = async (req, res) => {
  const post_ID = req.params.id;
  const comment_ID = req.body.commentId;

  if (!ID.isValid(post_ID) || !ID.isValid(comment_ID)) {
    return res.status(400).send("ID unknown :" + post_ID + "-" + comment_ID);
  }
  try {
    await CommentModel.findByIdAndRemove(comment_ID, (err, doc) => {
      if (!err) return res.status(200).send({ message: "deleted sucessfully" });
      return res.status(400).send({ message: err });
    });
  } catch (err) {
    return res.status(400).send({ message: JSON.stringify(err.message) });
  }
};

export default { createComment, deleteComment, updateComment };
