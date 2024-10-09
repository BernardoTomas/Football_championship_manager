import { Optional } from 'sequelize';
import IUser from 'src/Interfaces/IUser';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser<Optional, 'password'>;
  }
}
