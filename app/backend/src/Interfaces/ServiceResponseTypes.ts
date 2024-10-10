export type ServiceErrData = { message: string };

type ServiceResStatusErrType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

type ServiceResStatusSuccessType = 'SUCCESSFUL' | 'CREATED';

export type ServiceResErr = {
  status: ServiceResStatusErrType;
  data: ServiceErrData;
};

export type ServiceResSuccess<T> = {
  status: ServiceResStatusSuccessType,
  data: T,
};

export type ServiceRes<T> = ServiceResErr | ServiceResSuccess<T>;
