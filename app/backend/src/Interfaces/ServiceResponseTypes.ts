export type ServiceErrData = { message: string };

type ServiceResStatusErrType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResErr = {
  status: ServiceResStatusErrType;
  data: ServiceErrData;
};

export type ServiceResSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T,
};

export type ServiceRes<T> = ServiceResErr | ServiceResSuccess<T>;
