import express, { Router } from 'express';
import { getPosts, getPostByQuery, createPost, getPostById, deletePost, updatePost } from '../controllers/post';

const router: Router = express.Router();

/**
 * @openapi
 * /post:
 *  get:
 *    tags:
 *    - Post
 *    summary: Get all posts
 *    description: Get all posts
 *    responses:
 *      200:
 *        description: Returns all posts
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Post'
 *        
 */
router.get('/post', getPosts);

/**
 * @openapi
 * /post/{postId}:
 *   get:
 *     tags:
 *     - Post
 *     summary: Get post by id
 *     parameters:
 *     - name: postId
 *       in: path
 *       description: The id of post
 *       required: true
 *     responses:
 *      200:
 *       description: Post with that id exists
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Post'
 *      404:
 *       description: post with that id does not exist
 */
router.get('/post/:postId', getPostById);

/**
 * @openapi
 * /post/query:
 *  get:
 *    tags:
 *    - Post
 *    summary: Get posts by query
 *    description: Get posts by query
 *    responses:
 *      200:
 *        description: Returns all posts according to query
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Post'
 *      404:
 *       description: There are no posts with that query
 *       content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Post'
 *           maxItems: 0
 */
router.get('/post/query', getPostByQuery);

/**
 * @openapi
 * /post:
 *  post:
 *   tags:
 *   - Post
 *   summary: Create new post
 *   description: Create new post
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        content:
 *         type: string
 *   responses:
 *    201:
 *     description: New post created
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *         post:
 *          $ref: '#/components/schemas/Post'
 *    500:
 *     description: Server error
 */
router.post('/post', createPost);

/**
 * @openapi
 * /post/{postId}:
 *   delete:
 *     tags:
 *     - Post
 *     summary: Delete post by id
 *     parameters:
 *     - name: postId
 *       in: path
 *       description: The id of post
 *       required: true
 *     responses:
 *      200:
 *       description: Post with that id exists
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Post'
 *      404:
 *       description: post with that id does not exist
 */
router.delete('/post/:postId', deletePost);

/**
 * @openapi
 * /post:
 *  patch:
 *   tags:
 *   - Post
 *   summary: Update existing post
 *   description: Update existing post
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        postId:
 *         type: string
 *         required: true
 *        title:
 *         type: string
 *         required: true
 *        content:
 *         type: string
 *         required: true
 *   responses:
 *    200:
 *     description: Post updated
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *         post:
 *          $ref: '#/components/schemas/Post'
 *    500:
 *     description: Server error
 */
router.patch('/post', updatePost );

export default router;