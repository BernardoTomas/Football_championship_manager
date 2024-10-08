import { sign, verify } from 'jsonwebtoken';

export type PayloadObject = {
  id: number,
  email: string,
};

const JWT_SECRET: string = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (payload: PayloadObject): string => {
  const token = sign(payload, JWT_SECRET);
  return token;
};

const verifyToken = (token: string): PayloadObject => {
  const payload = verify(token, JWT_SECRET) as PayloadObject;
  return payload;
};

export {
  createToken,
  verifyToken,
};
