import { UserLoginType } from '../Interfaces/IUser';
import UserModel from '../models/UserModel';
import { ServiceRes } from '../Interfaces/ServiceResponseTypes';
import IUserModel, { Token } from '../Interfaces/IUserModel';
import jwt from '../utils/jwt.util';
import verify from '../utils/requiredFieldsArrays';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async login(user: UserLoginType): Promise<ServiceRes<Token>> {
    const loggedUser = await this.userModel.login(user);

    if (!loggedUser || !verify.verifyLoginFields(user, loggedUser)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.createToken({
      id: Number(loggedUser.id),
      username: loggedUser.username,
      role: loggedUser.role,
      email: loggedUser.email,
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
