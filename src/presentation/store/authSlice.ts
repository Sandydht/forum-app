/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import LoginAccountUseCase from '../../application/usecases/LoginAccountUseCase'
import AuthenticationRepositoryImpl from '../../infrastructure/repositories/AuthenticationRepositoryImpl'
import type { UserLoginResponseDto } from '../../infrastructure/dto/response/UserLoginResponseDto'
import type { UserLoginRequestDto } from '../../infrastructure/dto/request/UserLoginRequestDto'
import UserMapper from '../../infrastructure/mappers/UserMapper'
import AuthMapper from '../../infrastructure/mappers/AuthMapper'
import SecureStorageImpl from '../../infrastructure/service/SecureStorageImpl'

export const loginAccount = createAsyncThunk<UserLoginResponseDto, UserLoginRequestDto, { rejectValue: string }>(
  'auth/login-account',
  async (payload: UserLoginRequestDto, { rejectWithValue }) => {
    try {
      const useCase = new LoginAccountUseCase(new AuthenticationRepositoryImpl())
      const result = await useCase.execute(UserMapper.toUserLoginDomain(payload))
      const resultMap = AuthMapper.toUserLoginResponseDto(result)

      SecureStorageImpl.setSecureItem('accessToken', resultMap.accessToken)
      SecureStorageImpl.setSecureItem('refreshToken', resultMap.refreshToken)

      return resultMap
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
