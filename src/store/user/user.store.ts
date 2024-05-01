import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { State } from '../../types/State';
import { AuthorizationStatus } from '../../const';

export interface UserState {
  data?: User;
  authotizationStatus: AuthorizationStatus;
}

const initialState: UserState = {
  data: undefined,
  authotizationStatus: AuthorizationStatus.LOADING
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: (state) => {
      state.data = undefined;
      state.authotizationStatus = AuthorizationStatus.NO_AUTH;
    },
    signIn: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.authotizationStatus = AuthorizationStatus.LOGGINED;
    },
    changeAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authotizationStatus = action.payload;
    },
  }
});

export const { signOut, signIn, changeAuthorizationStatus } = userSlice.actions;

export const selectUser = (state: State) => state.user.data;
export const selectAuthorizationStatus = (state: State) => state.user.authotizationStatus;

export const userReducer = userSlice.reducer;
