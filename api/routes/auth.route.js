import express from 'express';
import { signup, signing, google, signOut, forgotPassword, resetPassword } from '../controllers/auth.controller.js';



const router = express.Router();

router.post('/signup', signup);
router.post('/signing', signing);
router.post('/google', google);
router.get('/sign-out', signOut);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router; 