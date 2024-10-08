import IUser, { UserLoginType } from './IUser';

export type Token = {
  token: string;
};

export default interface IUserModel {
  login(user: UserLoginType): Promise<IUser | null>;
}
