import express from 'express';
import userController from '../controllers/userController';
import messageController from '../controllers/messageController';

const router = express.Router();

router.post('/api/v2/auth/signup', userController.userSignup);
router.delete('/api/v2/users/:email', userController.deleteUser);
router.post('/api/v2/auth/login', userController.login);

router.post('/api/v2/messages', messageController.addMessage);
router.get('/api/v2/messages/:email', messageController.userMessages);

export default router;
