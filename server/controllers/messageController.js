/* eslint-disable max-len */
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
      token,
    } = req.body;
    const findUser = await con.query(user.returnUser, [email]);
    const ownerId = jwt.sign(findUser.rows[0].userid, process.env.NEVERMIND);
    if (ownerId === token) {
      const result = await con.query(messageModel.addMessage, [messageId, subject, message, parentMessageId, status, createdOn, findUser.rows[0].userid]);
      return res.status(201).json({
        status: 201,
        data: [result.rows[0]],
      });
    }
    return res.status(400).json({
      status: 400,
      data: ['error'],
    });
  }

  static async userMessages(req, res) {
    const usrId = await con.query(user.returnUser, [req.params.email]);
    const myMessages = await con.query(messageModel.returnMessages, [usrId.rows[0].userid]);
    return res.status(200).json({
      status: 200,
      data: myMessages.rows,
    });
  }
}
export default messageController;
