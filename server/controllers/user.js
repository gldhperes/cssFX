import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js'
import PostMessage from '../models/postMessage.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare( password, existingUser.password )

        if ( !existingUser || !isPasswordCorrect) return res.status(404).json({ message: "Invalid user or password." })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Teste', { expiresIn: '1h' } )

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

        if ( existingUser ) return res.status(400).json({ message: "User already exists." })

        if ( password !== confirmPassword ) return res.status(400).json({ message: "Password don't match." })

        const hashedPassword = await bcrypt.hash( password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName }` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'Teste', { expiresIn: '1h' } )

        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const favoritePost = async (req, res) => {
    const userId   = req.params.userId
    const postId  = req.body.postId
    
    // console.log(`userId: ${userId}`);
    // console.log(`postId: ${postId}`);
    // console.log(typeof(postId));

    if ( !userId) return res.json({ message: 'Unauthenticated' })

    if( !mongoose.Types.ObjectId.isValid(postId) ) return res.status(404).send('No post with that id')

    try {
        const user = await User.findById( userId );
        // console.log(`user: ${user}`);

        const post = await PostMessage.findById( postId );
        // const index = user.findOne({_id: userId}, {favoritedPosts: 1}).favoritedPosts.includes(postId)
        // console.log(`index: ${index}`);
        
        let updatedFavPost = null

        if (user.favoritedPosts.includes(postId)) {
            updatedFavPost = await User.findByIdAndUpdate( userId, { $pull: { favoritedPosts: postId } }, {new: true});
        }else{
            updatedFavPost = await User.findByIdAndUpdate( userId, { $addToSet: { favoritedPosts: postId } }, {new: true});
        }
        
        const favPost = updatedFavPost.favoritedPosts
        // console.log(`updatedFavPost: ${updatedFavPost.favoritedPosts}`);
        res.status(200).json( {favPost: favPost}  );
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
}

export const getFavoritePosts = async (req, res) => {
    const userId  = req.params.userId
    // console.log(`userId: ${userId}`);
    if ( !userId) return res.json({ message: 'Unauthenticated' })

    try {
        const user = await User.findById( userId );
        
        const favPost = user.favoritedPosts
       
        console.log(`updatedFavPost: ${favPost}`);
        // res.status(200).json({getFavoritePosts: favPosts});
        res.status(200).json( {favPost: favPost} );
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
}

