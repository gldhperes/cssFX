import express from "express";
import * as userController from '../controllers/user.js';
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.post('/googlesignin', userController.googleSignIn)

router.patch('/:userId/favoritePost', auth, userController.favoritePost)  
router.get('/:userId/favoritePosts', auth, userController.getFavoritePosts)
router.get('/:userId/userPosts', auth, userController.getUserPosts)

router.post('/follow', auth, userController.follow)
router.get('/:userId/following', auth, userController.following)
router.get('/:userId/profile', auth, userController.getUserProfile)
router.get('/:userId/likeds', auth, userController.getLikedsPosts)

export default router