import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class authentication {
  static verifyMe(req, res, next) {
    const head = req.headers.token;
    jwt.verify(head, process.env.NEVERMIND, (error, dcrypt) => {
      if (error) {
        return res.status(401).json({
          error: error.message,
        });
      }
      req.user = dcrypt;
      next();
    });
  }
}
export default authentication;
