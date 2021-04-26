const UserModel = require("../models/user.model");
const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfile = async (req, res) => {
  try {
    console.log("wtf");
    console.log(req.file);
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    )
      return res.status(500).json({ message: "File Not Supported" });

    if (req.file.size > 500000)
      return res.status(500).json({ message: "File is Too Big" });
  } catch (err) {
    return res.status(500).json(err);
  }

  const fileName = req.body.name + ".jpg";
  const stream = Readable.from(req.file.buffer);

  await pipeline(
    stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profile/${fileName}`
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: { picture: "./uploads/profile/" + fileName },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, doc) => {
        !err ? res.send(doc) : res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
