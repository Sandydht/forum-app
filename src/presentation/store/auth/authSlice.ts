import { createSlice } from '@reduxjs/toolkit'
import { loginAccount } from './authThunks'
import { type AsyncState, createAsyncState, addAsyncThunkHandlers } from '../utils/createAsyncHandlers'
import type { UserLoginResponseDto } from '../../../infrastructure/dto/response/UserLoginResponseDto'

interface AuthState {
  login: AsyncState<UserLoginResponseDto>
}

const initialState: AuthState = {
  login: createAsyncState<UserLoginResponseDto>()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, loginAccount, 'login')
  }
})

export default authSlice.reducer
