import express from "express";
import { signin, signup, googleSignIn, getFavoritePosts, favoritePost, getUserPosts } from '../controllers/user.js';
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/googlesignin', googleSignIn)


router.patch('/:userId/favoritePost', auth, favoritePost)  
router.get('/:userId/favoritePosts', auth, getFavoritePosts)
router.get('/:userId/userPosts', auth, getUserPosts)

export default router