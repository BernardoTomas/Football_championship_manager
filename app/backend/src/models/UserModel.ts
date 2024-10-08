import IUserModel from '../Interfaces/IUserModel';
import IUser, { UserLoginType } from '../Interfaces/IUser';
import UserSequelizeModel from '../database/models/SequelizeUserModel';

export default class UserModel implements IUserModel {
  private model = UserSequelizeModel;

  public async login(user: UserLoginType): Promise<IUser | null> {
    const loggedUser = await this.model.findOne({ where: { email: user.email }, raw: true });
    return loggedUser;
  }
}
