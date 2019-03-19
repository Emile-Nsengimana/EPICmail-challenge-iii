/* eslint-disable max-len */
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import encrypt from 'bcryptjs';
import user from '../models/user';
import con from '../../connection';

dotenv.config();

class userController {
  static async userSignup(req, res) {
    const userId = uuid();
    const token = jwt.sign(userId, process.env.SALT);
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    } = req.body;
    const result = await con.query(user.saveUser, [userId, firstName, lastName, email, password, phoneNo]);
    if (result.rowCount === 0) {
      return res.status(401).json({
        status: 401,
        message: 'Error',
      });
    }
    return res.status(201).json({
      status: 201,
      data: [{ token }],
    });
  }

  static async deleteUser(req, res) {
    const removeUserResult = await con.query(user.removeUser, [req.params.email]);
    if (removeUserResult.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        data: 'User doesn\'t exist',
      });
    }
    return res.status(200).json({
      status: 201,
      data: 'user removed',
    });
  }
}
export default userController;
