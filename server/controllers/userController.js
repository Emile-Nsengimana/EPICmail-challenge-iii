/* eslint-disable max-len */
import uuid from 'uuid/v4';
import user from '../models/user';
import con from '../../connection';


class userController {
  static async saveNewUser(req, res) {
    const userId = uuid();
    const {
      firstName, lastName, email, password, phoneNo,
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
      data: ['user registered successful'],
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
      status: 200,
      data: 'user removed',
    });
  }
}
export default userController;
