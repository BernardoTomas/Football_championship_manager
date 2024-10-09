import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationMiddleware from '../middlewares/verifyLoginMiddleware';
import ValidateAuth from '../middlewares/validateAuthTokenMiddleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidationMiddleware.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  ValidateAuth.validateAuthToken,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default router;
