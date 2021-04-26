const nongoose = require("mongoose");
const { isEmpty } = require("validator");
const PostSchema = nongoose.Schema(
  {
    creatorId: {
      type: String,
      // trim: true,
      // required: true,
    },
    creator: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      maxlength: 80,
    },
    body: {
      type: String,
      trim: true,
      maxlength: 250,
      required: true,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likes: {
      type: [String],
      require: true,
    },
    comments: {
      required: true,
      type: [
        {
          isReady: {
            type: Boolean,
            default: true,
          },
          creatorId: {
            type: String,
            required: true,
          },
          creator: {
            type: String,
            required: true,
          },
          timestamp: Number,

          body: {
            type: String,
            required: true,
            trim: true,
          },
          likes: {
            type: [String],
            required: true,
          },
          replies: {
            require: true,
            type: [
              {
                creatorId: String,
                creatorName: String,
                timestamp: Number,
                body: {
                  type: String,
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = nongoose.model("post", PostSchema);
