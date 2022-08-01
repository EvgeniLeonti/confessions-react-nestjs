import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

const parseJwt = (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  catch (e) {
    console.warn('parseJwt error', e);
  }
};

export interface AuthState {
  accessToken: string | null,
  refreshToken: string | null,
  user: any,
}
const initialAccessToken = localStorage.getItem('accessToken');
const initialRefreshToken = localStorage.getItem('refreshToken');

const initialState: AuthState = {
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  user: initialAccessToken ? parseJwt(initialAccessToken) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      state.user = parseJwt(action.payload);
    },
    unsetAccessToken: (state) => {
      state.accessToken = null
      state.user = null
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    unsetRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = null
    },
  },

})

// Action creators are generated for each case reducer function
export const {
  setAccessToken,
  unsetAccessToken,
  setRefreshToken,
  unsetRefreshToken,
} = authSlice.actions

export default authSlice.reducer
