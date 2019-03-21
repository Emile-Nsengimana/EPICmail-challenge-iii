/* eslint-disable max-len */
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import moment from 'moment';
import messageModel from '../models/message';
import con from '../../connection';
import user from '../models/user';
import us from '../auth/auth';

dotenv.config();

class messageController {
  static async addMessage(req, res) {
    const messageId = uuid();
    const createdOn = moment.utc().format('DD-MM-YYYY');
    const {
      subject,
      message,
      parentMessageId,
      status,
      email,
    } = req.body;

    try {
      const findUser = await con.query(user.returnUser, [email]);
      if (findUser.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'the email you are sending to can\'t be reached',
        });
      }
      const result = await con.query(messageModel.addMessage, [messageId, subject, message, parentMessageId, status, createdOn, findUser.rows[0].userid]);
      if (status === 'inbox') {
        try {
          await con.query(messageModel.addInbox, [findUser.rows[0].userid, messageId, createdOn]);
        } catch (error) {
          return res.status(400).json({
            status: 500,
            data: [error.detail],
          });
        }
      } else if (status === 'sent') {
        await con.query(messageModel.addSent, [findUser.rows[0].userid, messageId, createdOn]);
      } return res.status(201).json({
        status: 201,
        data: [result.rows[0]],
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      });
    }
  }

  static async userMessages(req, res) {
    const userNo = req.user.id;
    const myMessages = await con.query(messageModel.returnMessages, [userNo]);
    if (myMessages.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: myMessages.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'you have no message',
    });
  }

  static async showInboxMessages(req, res) {
    if (req.user.id) {
      const messageIds = await con.query(messageModel.getInboxMessagesId, [req.user.id]);
      if (messageIds.rowCount !== 0) {
        const inboxMessage = await con.query(messageModel.getInboxMessages, [req.user.id]);
        return res.status(200).json({
          status: 200,
          data: inboxMessage.rows,
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'your inbox is empty',
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'user with that email doesn\'t exist',
    });
  }

  static async showSentMessages(req, res) {
    const messageIds = await con.query(messageModel.getSentMessagesId, [req.user.id]);
    if (messageIds.rowCount !== 0) {
      const sentMessage = await con.query(messageModel.getSentMessages, [req.user.id]);
      return res.status(200).json({
        status: 200,
        data: sentMessage.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'you have not sent any message',
    });
  }

  static async showReadMessages(req, res) {
    const readMessage = await con.query(messageModel.getReadMessages, [req.user.id]);
    if (readMessage.rowCount) {
      return res.status(200).json({
        status: 200,
        data: readMessage.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'you have no message',
    });
  }

  static async showUnreadMessages(req, res) {
    const unreadMessage = await con.query(messageModel.getUnreadMessages, [req.user.id]);
    if (unreadMessage.rowCount) {
      return res.status(200).json({
        status: 200,
        data: unreadMessage.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'you have no unread message',
    });
  }
}
export default messageController;
