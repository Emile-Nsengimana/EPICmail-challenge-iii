import express from 'express';
import userController from '../controllers/userController';
import messageController from '../controllers/messageController';
import groupController from '../controllers/groupController';
import auth from '../auth/auth';


const router = express.Router();

router.post('/api/v2/auth/signup', userController.userSignup);
router.delete('/api/v2/users/:email', auth.verifyMe, userController.deleteUser);
router.post('/api/v2/auth/login', userController.login);

router.post('/api/v2/messages', auth.verifyMe, messageController.addMessage);
router.get('/api/v2/messages/:email', auth.verifyMe, messageController.userMessages);
router.get('/api/v2/messages/inbox/:email', auth.verifyMe, messageController.showInboxMessages);
router.get('/api/v2/messages/sent/:email', auth.verifyMe, messageController.showSentMessages);

router.post('/api/v2/groups', auth.verifyMe, groupController.createGroup);
router.get('/api/v2/groups', auth.verifyMe, groupController.showGroups);
router.get('/api/v2/groups/:groupId', auth.verifyMe, groupController.getGroup);
router.delete('/api/v2/groups/:groupId', auth.verifyMe, groupController.deleteGroup);

export default router;
