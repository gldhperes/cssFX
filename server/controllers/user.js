import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js'
import PostMessage from '../models/postMessage.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!existingUser || !isPasswordCorrect) return res.status(404).json({ message: "Invalid user or password." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Teste', { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })
        // const isPasswordCorrect = await bcrypt.compare( password, existingUser.password )

        if (existingUser) return res.status(400).json({ message: "User already exists." })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'Teste', { expiresIn: '1h' })

        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const googleSignIn = async (req, res) => {
    const profileObj = req.body
    const email = profileObj.email

    // console.log(`profileObj: ${ JSON.stringify(profileObj)}`);

    try {
        const existingUser = await User.findOne({ email })

        // SE NAO EXISTIR, ENTAO CRIA
        if (!existingUser) {
            const password = `${profileObj.familyName}+${profileObj.googleId}+${profileObj.givenName}+54321`
            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({ email: email, password: hashedPassword, name: `${profileObj.givenName} ${profileObj.familyName}` })

            const token = jwt.sign({ email: result.email, id: result._id }, 'Teste', { expiresIn: '1h' })

            res.status(200).json({ result: result, token })
        } else {
            // SE EXISTIR, ENTAO DEVOLVE USUARIO
            const password = `${profileObj.familyName}+${profileObj.googleId}+${profileObj.givenName}+54321`
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

            // console.log( `pass: ${existingUser.password}` );
            // console.log( `isPasswordCorrect: ${isPasswordCorrect}` );

            // const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

            if (!isPasswordCorrect) {
                console.log("Nao é o mesmo usuario");
                return
            }


            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Teste', { expiresIn: '1h' })

            res.status(200).json({ result: existingUser, token })
        }


    } catch (error) {
        console.log(error.message);
    }
}

export const favoritePost = async (req, res) => {
    const userId = req.params.userId
    const postId = req.body.postId

    // console.log(`userId: ${userId}`);
    // console.log(`postId: ${postId}`);
    // console.log(typeof(postId));

    if (!userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

    try {
        const user = await User.findById(userId);
        // console.log(`user: ${user}`);

        // const post = await PostMessage.findById( postId );
        // const index = user.findOne({_id: userId}, {favoritedPosts: 1}).favoritedPosts.includes(postId)
        // console.log(`index: ${index}`);

        let updatedFavPost = null

        if (user.favoritedPosts.includes(postId)) {
            updatedFavPost = await User.findByIdAndUpdate(userId, { $pull: { favoritedPosts: postId } }, { new: true });
        } else {
            updatedFavPost = await User.findByIdAndUpdate(userId, { $addToSet: { favoritedPosts: postId } }, { new: true });
        }

        const posts = updatedFavPost.favoritedPosts
        // console.log("POSTS:", posts);

        if (posts !== [] || posts !== null) return

        const favPost = await PostMessage.find({ _id: posts.toString().split(',') })

        res.status(200).json({ favPost: favPost });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error });
    }
}

export const getFavoritePosts = async (req, res) => {
    const userId = req.params.userId
    // console.log(`userId: ${userId}`);
    if (!userId) return res.json({ message: 'Unauthenticated' })

    try {
        const user = await User.findById(userId);

        const posts = user.favoritedPosts
        // console.log(`POSTS: ${posts}`);

        if (posts == '') {
            res.status(200).json({ favPost: [] });
            return
        }

        const favPost = await PostMessage.find({ _id: posts.toString().split(',') })
        // console.log(`favPost: ${favPost}`);

        res.status(200).json({ favPost: favPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const getUserPosts = async (req, res) => {
    const userId = req.params.userId
    // console.log(`userId: ${userId}`);
    if (!userId) return res.json({ message: 'Unauthenticated' })

    try {
        const user = await User.findById(userId);

        const posts = await PostMessage.find({ creator: userId.toString() })

        // console.log(`posts: ${posts}`);

        res.status(200).json({ _userPosts: posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export const follow = async (req, res) => {
    const userId = req.body.userId
    const postCreator = req.body.postCreator

    // console.log(`${userId} | ${postCreator}`);

    // Se sao iguais entao esta seguindo vc mesmo
    if (userId == postCreator) return

    try {
        const user = await User.findById(userId);

        let updatedFollowing = null

        if (user.following.includes(postCreator)) {
            updatedFollowing = await User.findByIdAndUpdate(userId, { $pull: { following: postCreator } }, { new: true });
        } else {
            updatedFollowing = await User.findByIdAndUpdate(userId, { $addToSet: { following: postCreator } }, { new: true });
        }

        const follow = updatedFollowing.following
        console.log("follow:", follow);


        res.status(200).json({ following: follow });
    } catch (error) {
        console.log(error.message);

    }
}

export const following = async (req, res) => {
    const userId = req.params.userId
    console.log(`userId: ${userId}`);
    try {
        // const user = await User.findById(userId)
        const user = await User.findById(userId)
        const userFollowing = user.following.toString().split(',')
        const userNames = []

        for (let i = 0; i < userFollowing.length; i++) {
            const element = await User.findById (userFollowing[i] )
            console.log(element.name);

            userNames.push( element.name )
        }

        // console.log( userNames );


        res.status(200).json({ userNames: userNames });
    } catch (error) {
        console.log(error.message);
    }
}
