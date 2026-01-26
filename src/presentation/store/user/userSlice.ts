import { createSlice } from '@reduxjs/toolkit'
import { registerUser, getUserProfile } from './userThunks'
import type RegisterUserResponseDto from '../../../infrastructure/dto/response/RegisterUserResponseDto'
import type { UserProfileResponseDto } from '../../../infrastructure/dto/response/UserProfileResponseDto'
import { addAsyncThunkHandlers, createAsyncState, type AsyncState } from '../utils/createAsyncHandlers'

interface UserState {
  register: AsyncState<RegisterUserResponseDto>
  profile: AsyncState<UserProfileResponseDto>
}

const initialState: UserState = {
  register: createAsyncState<RegisterUserResponseDto>(),
  profile: createAsyncState<UserProfileResponseDto>(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, registerUser, 'register')
    addAsyncThunkHandlers(builder, getUserProfile, 'profile')
  },
})

export default userSlice.reducer
