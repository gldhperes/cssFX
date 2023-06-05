import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: String,
    creatorImg: String,
    name: String,
    title: String,
    htmlCode: String,
    cssCode: String,
    codeImg: String,
    backendCode: String,
    tags: [String],
    likes:{
        type: [String],
        default: [],
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;