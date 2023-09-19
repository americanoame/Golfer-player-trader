import express from 'express';
import { signing, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signing', signing)

export default router; 