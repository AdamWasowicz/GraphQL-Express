import express, { Router } from 'express';
import { login, signup } from '../controllers/auth';

const router: Router = express.Router();
router.put('/signup', signup)
router.post('/signup', login)

export default router;