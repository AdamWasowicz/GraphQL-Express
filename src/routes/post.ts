import express, { Router } from 'express';
import { getPosts, getPostByQuery, createPost, getPostById, deletePost, updatePost } from '../controllers/post';

const router: Router = express.Router();
router.get('/post', getPosts);
router.get('/post/:postId', getPostById);
router.get('/post/query', getPostByQuery);
router.post('/post', createPost);
router.delete('/post/:postId', deletePost);
router.patch('/post', updatePost );

export default router;