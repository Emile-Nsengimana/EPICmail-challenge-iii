/* eslint-disable max-len */
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import user from '../models/user';
import con from '../../connection';

dotenv.config();

class userController {
  static async userSignup(req, res) {
    const userId = uuid();
    const token = jwt.sign(userId, process.env.NEVERMIND);
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    } = req.body;
    const result = await con.query(user.saveUser, [userId, firstName, lastName, email, password, phoneNo]);
    if (result.rowCount === 0) {
      return res.status(400).json({
        status: 400,
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

  static async login(req, res) {
    const { email, password } = req.body;
    const userLogin = await con.query(user.returnUser, [email]);
    if (userLogin.rowCount !== 0) {
      const loginToken = jwt.sign(userLogin.rows[0].userid, process.env.NEVERMIND);

      if (userLogin.rows[0].password === password) {
        return res.status(200).json({
          status: 200,
          data: [{
            token: loginToken,
          }],
        });
      }
      return res.status(401).json({
        status: 401,
        data: 'incorrect username or password',
      });
    }
    return res.status(400).json({
      status: 400,
      data: 'user doen\'t exist',
    });
  }
}
export default userController;
