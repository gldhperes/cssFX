import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    favoritedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserMessage' }]
})

const UserMessage = mongoose.model('User', userSchema)

export default UserMessage;