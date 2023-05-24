import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js'
import PostMessage from '../models/postMessage.js'

const router = express.Router()

export const getPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await PostMessage.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query

    try {
        const LIMIT = 8;

        // Number(page) transforma a string page em um numero
        const startIndex = (Number(page) - 1) * LIMIT // Pega o index de começo de toda pagina
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// QUERY -> /posts?page=1 , logo -> page = 1    mais usados em pesquisas
// PARAMS -> /posts/:id , logo -> id = 123      mais usado em coisas especificas

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        // REGEXP = Regular Expression
        const title = new RegExp(searchQuery, 'i') // 'i' -> ignore case sensivite, ou seja, TEST = Test = test ( tudo vai ser 'test' )

        // Procura em todos os posts ou o titulo ou as tags
        // $or = ou acha o title ou acha tags
        // $in = todas as tags que estao no array de tags
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    try {

        const user = await User.findById(req.userId);
        const newPost = new PostMessage({ ...post, creator: req.userId, creatorImg: user.photo, codeImg: post.codeImg })

        await newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body


    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    // const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    const userId = req.userId


    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const user = await User.findById(userId)

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(userId))

    if (index === -1) {
        // LIKE A POST
        post.likes.push(userId)
        user.likedPosts.push(post._id)

    } else {
        // DISLIKE A POST
        post.likes = post.likes.filter((id) => id !== String(userId))
        user.likedPosts = user.likedPosts.filter((id) => id !== String(post._id))
    }
    const userLikedPosts = user.likedPosts

    // console.log(`User Liked Posts: ${user.likedPosts}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    await User.findByIdAndUpdate(userId, { likedPosts: userLikedPosts });


    res.json(updatedPost)
}