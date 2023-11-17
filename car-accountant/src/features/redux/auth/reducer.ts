import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginAPI, authenticationAPI } from '@/api/login/action'
import { AuthState, credentials } from './types'
import { AdminUser, NonAdminUser } from '@/api/login/type'

const initialState: AuthState = {
  loading: false,
  isDoneAuthenticated: false,
  user: null,
  error: null,
}

export const asyncLogin = createAsyncThunk('auth/login', async ({ email, password }: credentials) => {
  console.log('login? ')

  const response: AdminUser | NonAdminUser | null = await loginAPI({ email, password })
  if (response) {
    return response
  }
})

export const asyncAuthentication = createAsyncThunk('auth/authentication', async () => {
  const token = localStorage.getItem('token') || ''
  const response: AdminUser | NonAdminUser | null = await authenticationAPI(token)

  if (response) {
    return response
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null
    },
  },
  extraReducers: {
    [asyncLogin.pending.type]: (state) => {
      state.loading = true
      state.isDoneAuthenticated = false
      state.error = null
    },
    [asyncLogin.fulfilled.type]: (state, action: PayloadAction<AdminUser | NonAdminUser>) => {
      state.loading = false
      state.isDoneAuthenticated = true
      state.user = action.payload
    },
    [asyncLogin.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneAuthenticated = true
      state.error = action?.error?.message as string
    },
    [asyncAuthentication.pending.type]: (state) => {
      state.loading = true
      state.isDoneAuthenticated = false
      state.error = null
    },
    [asyncAuthentication.fulfilled.type]: (state, action: PayloadAction<AdminUser | NonAdminUser>) => {
      state.loading = false
      state.isDoneAuthenticated = true
      state.user = action.payload
    },
    [asyncAuthentication.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneAuthenticated = true
      state.error = action.error.message as string
    },
  },
})

export const { logOut } = authSlice.actions
export default authSlice.reducer
