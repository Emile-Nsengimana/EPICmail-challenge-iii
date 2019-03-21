/* eslint-disable max-len */
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import moment from 'moment';
import messageModel from '../models/message';
import con from '../../connection';
import user from '../models/user';

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
    const usrId = await con.query(user.returnUser, [req.params.email]);
    if (usrId.rowCount !== 0) {
      const myMessages = await con.query(messageModel.returnMessages, [usrId.rows[0].userid]);
      return res.status(200).json({
        status: 200,
        data: myMessages.rows,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'user with that email doesn\'t exist',
    });
  }

  static async showInboxMessages(req, res) {
    const inboxOwner = await con.query(user.returnUser, [req.params.email]);
    if (inboxOwner.rowCount !== 0) {
      const messageIds = await con.query(messageModel.getInboxMessagesId, [inboxOwner.rows[0].userid]);
      if (messageIds.rowCount !== 0) {
        const inboxMessage = await con.query(messageModel.getInboxMessages, [inboxOwner.rows[0].userid]);
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
    const sentOwner = await con.query(user.returnUser, [req.params.email]);
    const messageIds = await con.query(messageModel.getSentMessagesId, [sentOwner.rows[0].userid]);
    if (messageIds.rowCount !== 0) {
      const sentMessage = await con.query(messageModel.getSentMessages, [sentOwner.rows[0].userid]);
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
}
export default messageController;
