const PostModel = require("../models/post.model");
const ID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = async (req, res) => {
  await PostModel.find((err, docs) => {
    const modifiedDocs = docs.map((item) => {
      item.comments.isReady = true;
      return item;
    });

    !err ? res.send(modifiedDocs) : console.log("Get Data Error" + err);
  }).sort({ createdAt: -1 });
};
module.exports.createPost = async (req, res) => {
  let fileName;
  if (req.file) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      // const errors = uploadErrors(err);
      return res.status(201).json({ err });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    const stream = Readable.from(req.file.buffer);

    await pipeline(
      stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new PostModel({
    creator: req.body.creator,
    picture: req.file ? "./uploads/posts/" + fileName : "",
    title: req.body.title,
    body: req.body.body,
    video: req.body.video,
    likes: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).send(post);
  } catch (err) {
    let errors = {};
    if (err.message.includes("body")) {
      errors.body = "Please say something";
    }
    return res.status(401).send(err);
  }
};
module.exports.updatePost = async (req, res) => {
  const post_ID = req.params.id;
  !ID.isValid(post_ID) && res.status(400).send("ID unknown :" + post_ID);

  const updateRecords = {
    title: req.body.title,
    body: req.body.body,
  };
  const newValues = { $set: updateRecords };

  await PostModel.findByIdAndUpdate(
    post_ID,
    newValues,
    { new: true },
    (err, doc) => {
      !err ? res.send(doc) : console.log("Post Update error" + err);
    }
  );
};
module.exports.deletePost = async (req, res) => {
  const post_ID = req.params.id;
  !ID.isValid(post_ID) && res.status(400).send("ID unknown :" + post_ID);

  await PostModel.findByIdAndRemove(post_ID, (err, docs) => {
    !err ? res.send(docs) : console.log("Delete error " + err);
  });
};
