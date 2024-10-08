import { Request, Response, NextFunction } from 'express';
import requiredFields from '../utils/requiredFieldsArrays';

export default class ValidationMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const notAllFields = requiredFields.loginRequiredFields.find((field) => !(field in user));
    if (notAllFields) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  }
}
