import { Request, Response, NextFunction } from 'express';
import requiredFields from '../utils/requiredFieldsArrays';

const loginRequiredFields = ['email', 'password'];

export default class ValidationMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const notAllFields = loginRequiredFields.find((field) => !(field in user));
    if (notAllFields) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!requiredFields.goodLoginFields) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }
}
