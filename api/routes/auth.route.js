import express from 'express';
import { signup, signing, google } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signing', signing)

// this the second part
router.post('/google', google);

export default router; 