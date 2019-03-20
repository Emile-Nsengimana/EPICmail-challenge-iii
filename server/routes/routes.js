import express from 'express';
import userController from '../controllers/userController';
import messageController from '../controllers/messageController';
import groupController from '../controllers/groupController';

const router = express.Router();

router.post('/api/v2/auth/signup', userController.userSignup);
router.delete('/api/v2/users/:email', userController.deleteUser);
router.post('/api/v2/auth/login', userController.login);

router.post('/api/v2/messages', messageController.addMessage);
router.get('/api/v2/messages/:email', messageController.userMessages);
router.get('/api/v2/messages/inbox/:email', messageController.showInboxMessages);
router.get('/api/v2/messages/sent/:email', messageController.showSentMessages);

router.post('/api/v2/groups', groupController.createGroup);
router.get('/api/v2/groups', groupController.showGroups);
router.get('/api/v2/groups/:groupId', groupController.getGroup);
router.delete('/api/v2/groups/:groupId', groupController.deleteGroup);

export default router;
