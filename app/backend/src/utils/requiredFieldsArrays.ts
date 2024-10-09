import { compareSync } from 'bcryptjs';
import IUser, { UserLoginType } from '../Interfaces/IUser';

// const emailRegex = /^\w+@\w+\.\w{2,4}$/;

// const goodLoginFields = (
//   email: string,
//   password: string,
// ): boolean => emailRegex.test(email) && password.length > 6;

const verifyLoginFields = (
  user: UserLoginType,
  loggedUser: IUser,
): boolean => compareSync(user.password, loggedUser.password)
  || user.email !== loggedUser.email;

export default {
  // goodLoginFields,
  verifyLoginFields,
};
