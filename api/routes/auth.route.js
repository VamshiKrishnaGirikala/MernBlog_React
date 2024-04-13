import express from 'express';
import { oAuthSignin, signin, signup } from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', oAuthSignin);

export default router;