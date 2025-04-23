import express from 'express';
import { getOtherUsers, getProfile, login, logout, register } from '../controllers/user.controller.js';
import {isAuthenticated}  from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/register', register);
router.put('/login', login)
router.get('/profile', isAuthenticated, getProfile);
router.post('/logout',logout);
router.get('/other-users', isAuthenticated, getOtherUsers);
export default router;  