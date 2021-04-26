const router = require("express").Router();
const postController = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
const replyController = require("../controllers/reply.controller");
const likeController = require("../controllers/like.controller");
//crud post
router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//like and dislike post
router.patch("/like-post/:id", likeController.like_post);
router.patch("/unlike-post/:id", likeController.unlike_post);

//create a comment + UD comment
router.patch("/comment-create/:id", commentController.createComment);
router.patch("/comment-edit/:id", commentController.updateComment);
router.patch("/comment-delete/:id", commentController.deleteComment);

//like comment dislike comment
router.patch("/like-comment/:id", likeController.like_comment);
router.patch("/unlike-comment/:id", likeController.unlike_comment);

//create reply to a comment + RUD reply
router.patch("/reply-create/:id", replyController.createReply);
router.patch("/reply-edit/:id", replyController.updateReply);
router.patch("/reply-delete/:id", replyController.deleteReply);

module.exports = router;
