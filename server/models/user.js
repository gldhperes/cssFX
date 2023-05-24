import mongoose from 'mongoose';

// console.log(base64Image);

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, default: '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'},
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    favoritedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const UserMessage = mongoose.model('User', userSchema)

export default UserMessage;