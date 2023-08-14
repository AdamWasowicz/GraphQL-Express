import mongoose, { Schema } from "mongoose";

/**
 * @openapi
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             default: Email
 *           password:
 *             type: string
 *             default: Password
 *           name:
 *             type: string
 *             default: Name
 *           status:
 *             type: string
 *             default: Status
 *           posts:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Post'
 *
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'I am new'
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;