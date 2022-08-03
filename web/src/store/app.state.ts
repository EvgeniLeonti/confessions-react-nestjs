import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import i18n from "../i18n/i18n";

interface ClientJs {
  fingerprint: string
}

export interface AppState {
  language: string,
  clientJs: null | ClientJs,
}

const initialState: AppState = {
  language: i18n.language,
  clientJs: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      document.body.dir = i18n.dir();

      state.language = action.payload;
    },
    setClientJs: (state, action: PayloadAction<{ fingerprint: string }>) => {
      state.clientJs = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage, setClientJs } = appSlice.actions

export default appSlice.reducer
