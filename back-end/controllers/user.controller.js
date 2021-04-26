const userModel = require("../models/user.model");
const ID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  !ID.isValid(req.params.id) &&
    res.status(400).send("ID unknown :" + req.params.id);

  await userModel
    .findById(req.params.id, (err, docs) => {
      !err ? res.send(docs) : console.log("ID unknown :" + err);
    })
    .select("-password");
};

module.exports.userUpdate = async (req, res) => {
  !ID.isValid(req.params.id) &&
    res.status(400).send("ID unknown :" + req.params.id);

  try {
    const updateRecords = { bio: req.body.bio };
    const newValues = { $set: updateRecords };
    const User_ID = req.params.id;

    await userModel.findByIdAndUpdate(
      User_ID,
      newValues,
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        !err
          ? res.status(200).send(docs)
          : res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  !ID.isValid(req.params.id) &&
    res.status(400).send("ID unknown :" + req.params.id);
  try {
    const user_ID = req.params.id;

    await userModel.deleteOne({ _id: user_ID }).exec();
    res.status(200).json({ message: "user deleted succefully " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.followUser = async (req, res) => {
  if (!ID.isValid(req.params.id) || !ID.isValid(req.body.idToFollow)) {
    res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    // add to the follower list
    await userModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json({ message_fl: err });
      }
    );

    //add to following list
    await userModel.findByIdAndUpdate(
      req.body.idToFollow,
      {
        $addToSet: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (err) => {
        if (err) return res.status(400).json({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unFollowUser = async (req, res) => {
  if (!ID.isValid(req.params.id) || !ID.isValid(req.body.idToUnFollow)) {
    res.status(400).send("ID unknown :" + req.params.id);
  }
  try {
    // remove to the follower list
    await userModel.findByIdAndUpdate(
      req.params.id,

      {
        //remove
        $pull: { following: req.body.idToUnFollow },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json({ message: err });
      }
    );

    //remove to following list
    await userModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      {
        //remove
        $pull: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (err) => {
        if (err) return res.status(400).json({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
