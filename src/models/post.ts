import mongoose, { Schema } from "mongoose";

export interface Post {
    id: string,
    title: string,
    userId: string,
    content: string
}


/**
 * @openapi
 * components:
 *  schemas:
 *   Post:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      default: Title
 *     imageUrl:
 *      type: string
 *      default: localhost
 *     content:
 *      type: string
 *      default: Title
 *     creator:
 *      type: User
 *      default: TODO
 */
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