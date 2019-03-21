import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const verifyMe = (req, res, next) => {
  const head = req.headers.token;
  jwt.verify(head, process.env.NEVERMIND, (error, dcrypt) => {
    if (error) {
      return res.status(401).json({ error });
      // eslint-disable-next-line no-else-return
    } else {
      req.user = dcrypt;
      next();
    }
  });
};

export default verifyMe;
