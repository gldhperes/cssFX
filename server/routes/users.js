import express from "express";
import { signin, signup, getFavoritePosts, favoritePost } from '../controllers/user.js';
import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

router.patch('/:userId/favoritePost', auth, favoritePost)  
router.get('/:userId/favoritePosts', auth, getFavoritePosts)

export default router