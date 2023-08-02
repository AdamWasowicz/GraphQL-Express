import mongoose, { Schema } from "mongoose";

interface Post {
    id: string,
    title: string,
    userId: string,
    content: string
}

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true,});

const PostModel = mongoose.model('Post', postSchema)

export default PostModel;