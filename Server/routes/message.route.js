import express from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';


const messageRoute = express.Router();
messageRoute.post('/send/:receiverId', isAuthenticated, createMessage);
messageRoute.get('/get/:receiverId', isAuthenticated, getMessages);

export default messageRoute;