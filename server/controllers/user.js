import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import jwtDecode from 'jwt-decode';

import User from '../models/user.js'
import PostMessage from '../models/postMessage.js'
import { log } from 'console';

const expireTokenTime = '12h'

export const signin = async (req, res) => {

    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!existingUser || !isPasswordCorrect) return res.status(404).json({ message: "Invalid user or password." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Teste', { expiresIn: expireTokenTime })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const signup = async (req, res) => {

    try {
        const { email, password, confirmPassword, firstName, lastName } = req.body

        const existingUser = await User.findOne({ email })
        // const isPasswordCorrect = await bcrypt.compare( password, existingUser.password )

        if (existingUser) return res.status(400).json({ message: "User already exists." })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'Teste', { expiresIn: expireTokenTime })

        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const googleSignIn = async (req, res) => {

    try {
        const data = req.body
        console.log(data);

        const credential = data.credential;
        console.log(credential);
        
        const profileObj = jwtDecode(credential);
        // console.log("profileObj: ", profileObj);
        // return;

        const json_data = JSON.stringify(profileObj);
        // console.log(json_data);

        const email = profileObj?.email



        const existingUser = await User.findOne({ email })

        // SE NAO EXISTIR, ENTAO CRIA
        if (!existingUser) {
            const password = `${profileObj.family_name}+${profileObj?.sub}+${profileObj.given_name}+54321`
            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({ email: email, password: hashedPassword, name: `${profileObj.given_name} ${profileObj.family_name}` })

            const token = jwt.sign({ email: result.email, id: result._id }, 'Teste', { expiresIn: expireTokenTime })

            res.status(200).json({ result: result, token })
        } else {
            // SE EXISTIR, ENTAO DEVOLVE USUARIO
            // const password = `${profileObj.familyName}+${profileObj.googleId}+${profileObj.givenName}+54321`
            // const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

            // console.log( `pass: ${existingUser.password}` );
            // console.log( `isPasswordCorrect: ${isPasswordCorrect}` );

            // const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

            // if (!isPasswordCorrect) {
            //     console.log("Nao é o mesmo usuario");
            //     return
            // }


            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Teste', { expiresIn: expireTokenTime })

            res.status(200).json({ result: existingUser, token })
        }


    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export const favoritePost = async (req, res) => {

    try {
        const userId = req.params.userId
        const postId = req.body.postId

        // console.log(`userId: ${userId}`);
        // console.log(`postId: ${postId}`);
        // console.log(typeof(postId));

        if (!userId) return res.json({ message: 'Unauthenticated' })

        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')


        const user = await User.findOne({ userId });
        console.log(`user: ${user}`);

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

        if (posts != [] || posts !== null) return

        const favPost = await PostMessage.find({ _id: posts.toString().split(',') })

        res.status(200).json({ favPost: favPost });
    } catch (error) {
        console.log("Error on favorite post: ", error.message);
        res.status(500).json({ error });
    }
}

export const getFavoritePosts = async (req, res) => {

    try {
        const userId = req.params.userId
        // console.log(`userId: ${userId}`);
        if (!userId) return res.json({ message: 'Unauthenticated' })

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

    try {
        const userId = req.params.userId
        // console.log(`userId: ${userId}`);
        if (!userId) return res.json({ message: 'Unauthenticated' })

        const user = await User.findOne(userId);

        const posts = await PostMessage.find({ creator: userId.toString() })

        // console.log(`posts: ${posts}`);

        res.status(200).json({ _userPosts: posts });
    } catch (error) {
        console.log("Error on Get_User_Posts: ", error);
        res.status(500).json({ error });
    }
}

export const follow = async (req, res) => {

    try {
        const userId = req.body.userId
        const postCreator = req.body.postCreator

        // console.log(`${userId} | ${postCreator}`);

        // Se sao iguais entao esta seguindo vc mesmo
        if (userId == postCreator) return


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
        console.log("Error on Follow: ", error.message);

    }
}

export const following = async (req, res) => {

    try {
        const userId = req.params.userId
        console.log(`userId: ${userId}`);

        const user = await User.findById({ _id: userId });
        // console.log(`user: ${user}`);

    
        const userFollowing = user?.following?.toString().split(',')
        // console.log(`User Following: ${userFollowing}`);


        let followingUsers = []

        if (userFollowing) {

            for (let i = 0; i < userFollowing.length; i++) {

                console.log(userFollowing[i]);
                const followingUserId = userFollowing[i];

                const followingUser = await User.findById(followingUserId);

                // console.log(`Following User: ${followingUser.name}`);

                followingUsers.push({
                    name: followingUser.name,
                    id: followingUser._id,
                    photo: followingUser.photo
                });
            }

            console.log(followingUsers);
            res.status(200).json({ followingUsers: followingUsers });
        }

    } catch (error) {
        console.log("Error on Following: ", error.message);
    }
}

export const getUserProfile = async (req, res) => {

    // console.log(`userId: ${userId}`);
    try {
        const userId = req.params.userId

        const user = await User.findById(userId)
        const userPosts = await PostMessage.find({ creator: userId.toString() })
        const userPostsCount = userPosts.length

        const user_id = user._id
        const userName = user.name
        const userPhoto = user.photo
        const following = user.following
        const followingCount = user.following.length

        // PEGAR A FOTO DE PERFIL

        const userProfile = {
            user_id: user_id,
            userName: userName,
            userPhoto: userPhoto,
            following: following,
            followingCount: followingCount,
            userPosts: userPosts,
            userPostsCount: userPostsCount
        }
        // console.log(userProfile);
        // console.log(userPosts);
        // console.log(user.name+"|||"+user.following);

        res.status(200).json({ user: userProfile });
    } catch (error) {
        console.log(error.message);
    }
}

export const getLikedsPosts = async (req, res) => {

    try {
        const userId = req.params.userId
        console.log(`userId: ${userId}`);
        const user = await User.findById(userId)

        const postsLikeds = user.likedPosts
        let userLikedPosts = []

        // console.log(user);
        // console.log(`postsLikeds: ${postsLikeds}`);
        if (postsLikeds) {
            for (let i = 0; i < postsLikeds.length; i++) {

                const post = await PostMessage.findById(postsLikeds[i])

                console.log(post);

                userLikedPosts.push(
                    post
                );
            }

        }

        console.log(`userLikedPosts: ${userLikedPosts}`);
        // console.log(user.name+"|||"+user.following);

        res.status(200).json({ userLikedPosts: userLikedPosts });
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersBySearch = async (req, res) => {


    try {
        const query = req.query.searchQuery

        console.log(query);
        // REGEXP = Regular Expression
        // const title = new RegExp(searchQuery, 'i') // 'i' -> ignore case sensivite, ou seja, TEST = Test = test ( tudo vai ser 'test' )

        // Procura em todos os usuarios o query 
        // $or = ou acha o title ou acha tags
        // $in = todas as tags que estao no array de tags
        const _users = await User.find({ name: { $regex: query, $options: 'i' } });

        const users = []

        _users?.forEach(user => {

            users.push({
                name: user.name,
                id: user._id,
                photo: user.photo
            });

        });

        console.log(users);

        res.json({ data: users })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }


}

const getUserProfileInfos = (user) => {

    // const user = await User.findById(userId)
    // const userPosts = await PostMessage.find({ creator: userId.toString() })
    // const userPostsCount = userPosts.length

    // const user_id = user._id
    // const userName = user.name
    // const userPhoto = user.photo
    // const followingCount = user.following.length

    // followingUsers.push({
    //         name: user.name,
    //         id: user._id,
    //         photo: user.photo
    //     });

    const userProfileInfos = {
        id: user._id,
        name: user.name,
        photo: userhoto,
    }

    return userProfileInfos
}