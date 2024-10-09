import { Request, Response, NextFunction } from 'express';

const loginRequiredFields = ['email', 'password'];
const emailRegex = /^\w+@\w+\.\w{2,4}$/;

export default class ValidationMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    const notAllFields = loginRequiredFields.find((field) => !(field in user));
    if (notAllFields) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(user.email) && user.password.length > 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }
}
