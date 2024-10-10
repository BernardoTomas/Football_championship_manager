export type ServiceErrData = { message: string };

type ServiceResStatusErrType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResErr = {
  status: ServiceResStatusErrType;
  data: ServiceErrData;
};

export type ServiceResSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T,
};

export type ServiceRes<T> = ServiceResErr | ServiceResSuccess<T>;
