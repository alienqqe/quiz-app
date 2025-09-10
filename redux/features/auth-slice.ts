import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  value: AuthState
}

type AuthState = {
  token: string
}

const initialState = {
  value: {
    token: '',
  } as AuthState,
} as InitialState

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value.token = action.payload
    },
  },
})

export const { setToken } = auth.actions
export default auth.reducer
