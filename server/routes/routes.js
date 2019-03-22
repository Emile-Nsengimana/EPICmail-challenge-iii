import express from 'express';
import userController from '../controllers/userController';
import messageController from '../controllers/messageController';
import groupController from '../controllers/groupController';
import auth from '../auth/auth';


const router = express.Router();

router.post('/api/v2/auth/signup', userController.userSignup);
router.post('/api/v2/auth/login', userController.login);

router.post('/api/v2/messages', auth, messageController.addMessage);
router.get('/api/v2/messages/', auth, messageController.userMessages);
router.get('/api/v2/messages/inbox/', auth, messageController.showInboxMessages);
router.get('/api/v2/messages/sent/', auth, messageController.showSentMessages);
router.get('/api/v2/messages/read/', auth, messageController.showReadMessages);
router.get('/api/v2/messages/unread/', auth, messageController.showUnreadMessages);


router.post('/api/v2/groups', auth, groupController.createGroup);
router.get('/api/v2/groups', auth, groupController.showGroups);
router.get('/api/v2/groups/:groupId', auth, groupController.getGroup);
router.delete('/api/v2/groups/:groupId', auth, groupController.deleteGroup);
router.patch('/api/v2/groups/:groupId/:groupName', auth, groupController.updateGroupName);

export default router;
