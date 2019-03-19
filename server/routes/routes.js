import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/api/v2/users', userController.saveNewUser);
router.delete('/api/v2/users/:email', userController.deleteUser);

export default router;
