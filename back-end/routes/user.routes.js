const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();
//auth controller
router.post("/register", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//get all the user in our aplication
router.get("/", userController.getAllUsers);

//get aspecific user
router.get("/:id", userController.userInfo);

//update the user
router.put("/:id", userController.userUpdate);

//update the user
router.delete("/:id", userController.deleteUser);

//follow and unfollow users
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unFollowUser);

//
router.post("/upload", upload.single("file"), uploadController.uploadProfile);

module.exports = router;
