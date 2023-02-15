import { instance } from './axios';
import {
  IDefaultValuesRegistration,
  IPositionsResponse,
  IQueryOptions,
  IUsersPaginationResponse,
} from '../models/types';

export const api = {
  fetchUsers(params: IQueryOptions) {
    type ObjPropertyToString<T> = {
      [p in keyof T]: string;
    };

    let obj = { ...params } as ObjPropertyToString<IQueryOptions>;

    for (let key of Object.keys(obj)) {
      obj[key as keyof typeof obj] = obj[key as keyof typeof obj]?.toString();
    }

    const query = new URLSearchParams(obj).toString();
    return instance.get<IUsersPaginationResponse>(`/users?${query}`);
  },

  getToken() {
    return instance.get<{ success: boolean; token: string }>('/token');
  },

  getPositions() {
    return instance.get<IPositionsResponse>('/positions');
  },

  registrateUser(body: IDefaultValuesRegistration) {
    type Keys = keyof typeof body;
    type Values = typeof body[Keys];

    const formData = new FormData();

    let data = { ...body } as { [key in Keys]: Values };

    for (let key of Object.keys(body)) {
      formData.append(key, data[key as Keys] as string | Blob);
    }

    return instance.post<{ success: string; userId: number; message: string }>('users', formData);
  },
};
