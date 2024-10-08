import { compareSync } from 'bcryptjs';
import { UserLoginType } from '../Interfaces/IUser';
import UserModel from '../models/UserModel';
import { ServiceRes } from '../Interfaces/ServiceResponseTypes';
import IUserModel, { Token } from '../Interfaces/IUserModel';
import jwt from '../utils/jwt.util';

// const emailRegex = /^\w+@\w+\.\w{2,4}$/;

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async login(user: UserLoginType): Promise<ServiceRes<Token>> {
    const loggedUser = await this.userModel.login(user);
    if (
      !loggedUser
      || !compareSync(user.password, loggedUser.password)
      || user.email !== loggedUser.password) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.createToken({ id: Number(loggedUser.id), email: loggedUser.email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
