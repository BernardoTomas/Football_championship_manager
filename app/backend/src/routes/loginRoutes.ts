import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationMiddleware from '../middlewares/verifyLoginMiddleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidationMiddleware.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
