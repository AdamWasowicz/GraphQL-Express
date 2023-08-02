import bcrypt from 'bcryptjs';
import UserModel from '../models/user';
import PostModel from '../models/post';
import validator from 'validator';
import jwt from 'jsonwebtoken';


interface createUserArgs {
    userInput: {
        email: string,
        name: string,
        password: string
    }
}

interface createPostArgs {
    postInput: {
        title: string,
        content: string,
        imageUrl: string
    }
}

interface updatePostArgs extends createPostArgs {
    id: number
}

interface loginArgs {
    userInput: {
        email: string,
        password: string
    }
}

export class ExpanedError extends Error {
    data: any | undefined
    status: number | undefined
}


// Helper functions
const checkAuth = (req: any) => {
    if (!req.isAuth) {
        const error = new ExpanedError('Not authenticated');
        error.status = 401;
        throw error;
    }
}


// Resolvers
const hello = (): {text: string, views: number} => {
    return {
        text: "Hello",
        views: 100
    }
}

const createUser = async (args: createUserArgs, req: any) => {
    const { email, name, password} = args.userInput;

    // Validate fields
    const errors: {message: string}[] = [];
    if (!validator.isEmail(email)) {
        errors.push({ message: 'E-mailis invalid'})
    }
    if (validator.isEmpty(password) ||!validator.isLength(password, {min: 5})) {
        errors.push({ message: 'Password too short'})
    }
    if (errors.length > 0) {
        const error = new ExpanedError('Input error')
        error.data = errors;
        error.status = 422;
        throw error;
    }

    // Check if user is already in Db
    const isUserAlreadyInDb = await UserModel.findOne({ email: email})
    if (isUserAlreadyInDb) {
        const error = new Error('User exists already!');
        throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({
        email: email,
        name: name,
        password: hashedPassword
    });

    // Create user
    const createdUser = await user.save();
    // const output = {
    //     _id: createdUser._id,
    //     name: createdUser.name,
    //     email: createdUser.email,
    //     password: createdUser.password,
    //     status: createdUser.password,
    //     posts: createdUser.posts
    // }

    const output = {
        ...createdUser, _id: createdUser._id.toString()
    }

    return output;  
}

const login = async (args: loginArgs, req: any) => {
    const { email, password } = args.userInput;

    // Check if user is already in Db
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        const error = new ExpanedError('User not found');
        error.status = 401;
        
        throw error;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new ExpanedError('Password is wrong');
        error.status = 401;
        
        throw error;
    }

    // Generate token
    const token = jwt.sign({
        userId: user._id.toString(),
        email: user.email
    }, process.env.APP_KEY!, { expiresIn: '1h'})

    return { token: token, userId: user._id.toString() }
}

const createPost = async (args: createPostArgs, req: any) => {
    const { title, content, imageUrl} = args.postInput;

    // Check Auth
    checkAuth(req);

    // Validate input
    const errors: {message: string}[] = [];
    if (!validator.isEmpty(title) || validator.isLength(title, { min: 5 })) {
        errors.push({message: 'Title is invalid'})
    }
    if (!validator.isEmpty(content) || validator.isLength(content, { min: 5 })) {
        errors.push({message: 'Content is invalid'})
    }
    if (errors.length > 0) {
        const error = new ExpanedError('Input error')
        error.data = errors;
        error.status = 422;
        throw error;
    }

    // Find user from auth
    const user = await UserModel.findById(req.userId);
    if (!user) {
        const error = new ExpanedError('Input user')
        error.status = 401;
        throw error;
    }

    // Create post
    const post = new PostModel({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: user
    });

    // Save post
    const createdPost = await post.save();

    // Update user
    user.posts.push(createdPost as any);
    await user.save();

    return { ...createdPost, _id: createdPost._id.toString(), createdAt: createdPost.createdAt.toISOString(), updatedAt: createdPost.updatedAt.toISOString() }
}

const posts = async (args: {page: number}, req: any) => {
    const requiredPage = args.page != null ? args.page : 1;

    // Check auth
    checkAuth(req);

    // Get data
    const postsPerPage = 2;
    const totalPosts = await PostModel.find().countDocuments();
    const posts = await PostModel
        .find()
        .sort({ createdAt: -1})
        .skip((requiredPage -1) * postsPerPage)
        .limit(postsPerPage)
        .populate('creator');

    // Output data
    const outputPosts = posts.map(post => ({
        ...post,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
    }))

    return {
        posts: outputPosts,
        totalPosts: totalPosts
    }
}

const post = async (args: {id: number}, req: any) => {
    // Get auth
    checkAuth(req);

    // Get data
    const post = await PostModel
        .findById(args.id)
        .populate('creator');
    if (!post) {
        const error = new ExpanedError('No post found');
        error.status = 401;
        throw error;
    }

    return {
         ...post, 
         _id: post._id.toString(),
         createdAt: post.createdAt.toISOString(),
         updatedAt: post.updatedAt.toISOString()
    }
}

const updatePost = async (args: updatePostArgs, req: any) => {
    const { id, postInput } = args;

    // Check auth
    checkAuth(req);

    // Get data
    const post = await PostModel.findById(id).populate('creator');
    if (!post) {
        const error = new ExpanedError('No post found');
        error.status = 401;
        throw error;
    }

    // Check owner
    if (post.creator._id.toString() !== req.userId.toString()) {
        const error = new ExpanedError('Not authorized');
        error.status = 403;
        throw error;
    }

    // Update data
    post.title = postInput.title;
    post.content = postInput.content;

    // Save changes
    const updatedPost = await post.save();

    return {
        ...updatedPost, 
         _id: updatedPost._id.toString(),
         createdAt: updatedPost.createdAt.toISOString(),
         updatedAt: updatedPost.updatedAt.toISOString()
    }
}

const deletePost = async (args: {id: number}, req: any) => {
    const { id } = args;

    // Check auth
    checkAuth(req);

    // Get post
    const post = await PostModel.findById(id);
    if (!post) {
        const error = new ExpanedError('No post found!');
        error.status = 404;
        throw error;
    }

    // Check owner
    if (post.creator._id.toString() !== req.userId.toString()) {
        const error = new ExpanedError('Not authorized');
        error.status = 403;
        throw error;
    }

    // Remove post
    await PostModel.findByIdAndRemove(id);
    const user = await UserModel.findById(req.userId);
    (user!.posts as any).pull(id);
    await user!.save();
    
    return true;
}

export default { hello, createUser, login, createPost, posts, post, updatePost, deletePost };