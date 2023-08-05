import { RequestHandler } from 'express';
import PostModel from '../models/post';

export const getPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await PostModel.find();
        if (posts == null) {
            const error = new Error('Could not find any posts');
            next(error);
        }

        res.status(200).json({
            message: 'Posts fetched',
            post: posts
        })

        res.send();
    }
    catch (error) {
        next(error);
    }
}

export const getPostByQuery: RequestHandler = async (req, res, next) => {
    const currentPage: number = +req.query.page! || 1;
    const postsPerPage: number = 2;

    try {
        const amountOfPosts = await PostModel.find().countDocuments();
        const posts = PostModel.find()
            .skip((currentPage - 1) * postsPerPage)
            .limit(postsPerPage);
        
        
        res.status(200).json({
            message: 'Posts fetched',
            posts: posts,
            totalItems: amountOfPosts
        })

        res.send();
    }
    catch (error) {
        next(error)
    }
}

export const createPost: RequestHandler = async (req, res, next) => {
    try {
        const title: string = req.body.title;
        const content: string = req.body.content;
        const post = new PostModel({
            title: title,
            content: content,
            userId: 'AdamDev'
        })

        const response = await post.save();
        res.status(201).json({
            message: 'Post created',
            post: response
        });

        res.send();
    }
    catch (error) {
        next(error);
    }
}

export const getPostById: RequestHandler = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = PostModel.findById(postId);

        res.status(200).json({
            message: 'Post fetched',
            post: post
        })

        res.send();
    }
    catch (error) {
        next(error);
    }

}