import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import i18n from "../i18n/i18n";

export interface AppState {
  language: string
}

const initialState: AppState = {
  language: i18n.language,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      document.body.dir = i18n.dir();

      state.language = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage } = appSlice.actions

export default appSlice.reducer
