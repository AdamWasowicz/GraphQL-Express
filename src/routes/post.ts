import express, { Router } from 'express';
import { getPosts, getPostByQuery, createPost, getPostById } from '../controllers/post';

const router: Router = express.Router();
router.get('/post', getPosts);
router.get('/post/:postId', getPostById);
router.get('/post/query', getPostByQuery);
router.post('/post', createPost);

export default router;