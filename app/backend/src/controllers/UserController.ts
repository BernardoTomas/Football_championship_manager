import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const user = req.body;
    const serviceRes = await this.userService.login(user);
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public static getRole(req: Request, res: Response) {
    const { user } = req;
    return res.status(200).json({ role: user.role });
  }
}
