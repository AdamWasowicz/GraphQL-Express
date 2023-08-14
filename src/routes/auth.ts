import express, { Router } from 'express';
import { login, signup } from '../controllers/auth';

const router: Router = express.Router();

/**
 * @openapi
 *   /signup:
 *     put:
 *       tags:
 *       - Auth
 *       summary: Create new account
 *       description: Create new user
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         201:
 *           description: New account created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:   
 *                   message:
 *                     type: string
 *                   userId:
 *                     type: string
 */
router.put('/signup', signup)

/**
 * @openapi
 *   /signup:
 *     post:
 *       tags:
 *       - Auth
 *       summary: Login
 *       description: Log in to existing account
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: Login OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:   
 *                   token:
 *                     type: string
 *                   userId:
 *                     type: string
 */
router.post('/signup', login)

export default router;