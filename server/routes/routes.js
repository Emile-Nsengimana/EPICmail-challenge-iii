import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/api/v2/auth/signup', userController.userSignup);
router.delete('/api/v2/users/:email', userController.deleteUser);
router.post('/api/v2/auth/login', userController.login);

export default router;
