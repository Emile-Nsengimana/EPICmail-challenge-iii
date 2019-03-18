import uuid from 'uuid/v4';
import user from '../models/user';

class userController {
  static addUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    } = req.body;
    const newUser = {
      userId: uuid(),
      firstName,
      lastName,
      email,
      password,
      phoneNo,
    };
    user.saveUser(newUser);
    return res.status(201).json({
      status: 201,
      message: 'user created',
    });
  }
}

export default userController;
