/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import RegisterAccountUseCase from '../../application/usecases/RegisterAccountUseCase'
import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl'
import type RegisterUserResponseDto from '../../infrastructure/dto/response/RegisterUserResponseDto'
import type RegisterUserRequestDto from '../../infrastructure/dto/request/RegisterUserRequestDto'
import UserMapper from '../../infrastructure/mappers/UserMapper'

export const registerUser = createAsyncThunk<RegisterUserResponseDto, RegisterUserRequestDto, { rejectValue: string }>(
  'user/register-account',
  async (payload: RegisterUserRequestDto, { rejectWithValue }) => {
    try {
      const useCase = new RegisterAccountUseCase(new UserRepositoryImpl())
      const result = await useCase.execute(UserMapper.toRegisterUserDomain(payload))
      return UserMapper.toRegisterUserResponseDto(result)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    data: null as unknown | null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default userSlice.reducer
