/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import LoginAccountUseCase from '../../application/usecases/LoginAccountUseCase'
import AuthenticationRepositoryImpl from '../../infrastructure/repositories/AuthenticationRepositoryImpl'
import type { UserLoginResponseDto } from '../../infrastructure/dto/response/UserLoginResponseDto'
import type { UserLoginRequestDto } from '../../infrastructure/dto/request/UserLoginRequestDto'
import SecureStorageImpl from '../../infrastructure/service/SecureStorageImpl'
import UserLogin from '../../domain/users/entity/UserLogin'
import type NewAuth from '../../domain/authentications/entity/NewAuth'

export const loginAccount = createAsyncThunk<UserLoginResponseDto, UserLoginRequestDto, { rejectValue: string }>(
  'auth/login-account',
  async (payload: UserLoginRequestDto, { rejectWithValue }) => {
    try {
      const useCase = new LoginAccountUseCase(
        new AuthenticationRepositoryImpl(),
        new SecureStorageImpl()
      )

      const userLogin = new UserLogin(payload.username, payload.password, payload.captchaToken)
      const result: NewAuth = await useCase.execute(userLogin)
      
      return {
        accessToken: result.getAccessToken(),
        refreshToken: result.getRefreshToken()
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    data: null as unknown | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default authSlice.reducer
