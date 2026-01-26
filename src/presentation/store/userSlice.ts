/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import RegisterAccountUseCase from '../../application/usecases/RegisterAccountUseCase'
import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl'
import type RegisterUserResponseDto from '../../infrastructure/dto/response/RegisterUserResponseDto'
import type RegisterUserRequestDto from '../../infrastructure/dto/request/RegisterUserRequestDto'
import UserMapper from '../../infrastructure/mappers/UserMapper'
import type { UserProfileResponseDto } from '../../infrastructure/dto/response/UserProfileResponseDto'
import GetUserProfileUseCase from '../../application/usecases/GetUserProfileUseCase'

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

export const getUserProfile = createAsyncThunk<UserProfileResponseDto, void, { rejectValue: string }>(
  'user/get-profile',
  async (_, { rejectWithValue }) => {
    try {
      const useCase = new GetUserProfileUseCase(new UserRepositoryImpl())
      const result = await useCase.execute()
      return UserMapper.toUserProfileResponseDto(result)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

interface UserState {
  register: {
    loading: boolean
    data: RegisterUserResponseDto | null
    error: string | null
  }
  profile: {
    loading: boolean
    data: UserProfileResponseDto | null
    error: string | null
  }
}

const initialState: UserState = {
  register: {
    loading: false,
    data: null,
    error: null
  },
  profile: {
    loading: false,
    data: null,
    error: null
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true
        state.register.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.loading = false
        state.register.data = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false
        state.register.error = action.payload as string
      })

    builder
      .addCase(getUserProfile.pending, (state) => {
        state.profile.loading = true
        state.profile.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile.loading = false
        state.profile.data = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profile.loading = false
        state.profile.error = action.payload as string
      })
  },
})

export default userSlice.reducer
