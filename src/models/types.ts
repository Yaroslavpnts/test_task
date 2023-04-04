export const enum fetchStatus {
  Idle = 'idle',
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
}

export interface IErrorResponse {
  success: string;
  message: string;
}

export interface IQueryOptions {
  page?: number;
  offset?: number;
  count?: number;
}

export interface IDispatchUsersOption extends IQueryOptions {
  onlyLast: boolean;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

export interface IUsersPaginationResponse {
  success: boolean;
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  links: {
    next_url: string;
    prev_url: string;
  };
  users: IUserResponse[];
}

export interface IReturnTypeFetchUsersThunk extends IUsersPaginationResponse {
  onlyLast: boolean;
}

export interface IPosition {
  id: number;
  name: string;
}

export interface IPositionsResponse {
  success: boolean;
  positions: IPosition[];
}

export interface IDefaultValuesRegistration {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  photo: string | File;
}
