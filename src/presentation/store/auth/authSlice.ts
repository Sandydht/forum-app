import { createSlice } from '@reduxjs/toolkit'
import { loginAccount, requestResetPasswordLink } from './authThunks'
import { type AsyncState, createAsyncState, addAsyncThunkHandlers } from '../utils/createAsyncHandlers'
import type { UserLoginResponseDto } from '../../../infrastructure/dto/response/UserLoginResponseDto'
import type { RequestResetPasswordLinkResponseDto } from '../../../infrastructure/dto/response/RequestResetPasswordLinkResponseDto'

interface AuthState {
  login: AsyncState<UserLoginResponseDto>
  requestResetPasswordLink: AsyncState<RequestResetPasswordLinkResponseDto>
}

const initialState: AuthState = {
  login: createAsyncState<UserLoginResponseDto>(),
  requestResetPasswordLink: createAsyncState<RequestResetPasswordLinkResponseDto>()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, loginAccount, 'login')
    addAsyncThunkHandlers(builder, requestResetPasswordLink, 'requestResetPasswordLink')
  }
})

export default authSlice.reducer
