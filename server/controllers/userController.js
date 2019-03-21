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
    const jsonToken = jwt.sign({ id: userId }, process.env.NEVERMIND, { expiresIn: '24h' });
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
        message: 'user already exist',
      });
    }
    return res.status(201).json({
      token: jsonToken,
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const userLogin = await con.query(user.returnUser, [email]);
    const usrIds = userLogin.rows[0].userid;
    if (userLogin.rowCount !== 0) {
      const loginToken = jwt.sign({ id: usrIds }, process.env.NEVERMIND, { expiresIn: '24h' });
      if (userLogin.rows[0].password === password) {
        return res.status(200).json({
          token: loginToken,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'incorrect email or password',
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'user doen\'t exist',
    });
  }
}
export default userController;
