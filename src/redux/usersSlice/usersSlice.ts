import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/apiMethods';
import { RootState, AppDispatch } from '../../app/store';
import {
  fetchStatus,
  IDispatchUsersOption,
  IUserResponse,
  IReturnTypeFetchUsersThunk,
} from '../../models/types';
import { isAxiosError } from 'axios';

const validateError = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.message;
  } else {
    const { message } = error as { message: string };
    return message;
  }
};

export interface UsersInitialState {
  status: fetchStatus;
  users: IUserResponse[];
  nextPage: string;
}

const initialState: UsersInitialState = {
  status: fetchStatus.Idle,
  users: [],
  nextPage: 'defaultLink',
};

export const getUsersAsync = createAsyncThunk<
  // Return type of the payload creator
  IReturnTypeFetchUsersThunk,
  // First argument to the payload creator
  IDispatchUsersOption,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>('users/fetchUsers', async (params, { rejectWithValue }) => {
  const { onlyLast, ...rest } = params;

  if (onlyLast) {
    try {
      const { data } = await api.fetchUsers(rest);

      return { ...data, onlyLast };
    } catch (error) {
      return rejectWithValue(validateError(error));
    }
  } else {
    try {
      const { data } = await api.fetchUsers(params);

      return { ...data, onlyLast };
    } catch (error) {
      return rejectWithValue(validateError(error));
    }
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.status = fetchStatus.Pending;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        state.nextPage = action.payload.links.next_url;

        if (action.payload.onlyLast) {
          state.users = action.payload.users;
        } else {
          state.users = [...state.users, ...action.payload.users];
        }
      })
      .addCase(getUsersAsync.rejected, state => {
        state.status = fetchStatus.Error;
      });
  },
});

export const usersSelector = (state: RootState) => state.usersSlice.users;
export const usersNextPageUrlSelector = (state: RootState) => state.usersSlice.nextPage;

export default usersSlice.reducer;
