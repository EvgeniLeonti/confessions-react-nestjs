import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface ToastState {
  notifications: any[]
}

const initialState: ToastState = {
  notifications: [],
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<{ message: string, options: any }>) => {
      state.notifications = [...state.notifications, action.payload]
    },
    clearNotifications: (state) => {
      state.notifications = []
    },


  },
})

// Action creators are generated for each case reducer function
export const { pushNotification, clearNotifications } = toastSlice.actions

export default toastSlice.reducer
