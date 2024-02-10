const express = require("express");
const router = express.Router();


const {signUp, logIn, getAllUsers} = require("../controller/Authentication");
const {auth} = require("../middleware/auth");
const {contentPost,getAllPosts, likePost , disLikePost} = require("../controller/Contentcontroler");


router.post("/user/signup", signUp); 
router.post("/user/login", logIn);

router.post("/user/post", auth, contentPost); // for create post
router.get("/getAllPosts",getAllPosts); 
router.post("/likepost",auth, likePost);
router.post("/disLikePost",auth, disLikePost);
router.get("/getAllUsers",auth, getAllUsers);



module.exports = router;