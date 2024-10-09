import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt.util';

export default class ValidateAuth {
  static validateAuthToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const token = authorization.split(' ')[1];
      const user = jwt.verifyToken(token);
      req.body = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }
}
