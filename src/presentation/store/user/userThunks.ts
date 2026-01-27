import UserMapper from '../../../infrastructure/mappers/UserMapper'
import { createUseCaseThunk } from '../utils/createThunk'
import { userDependencies } from '../../../infrastructure/container'

export const registerUser = createUseCaseThunk(
  'user/register-account',
  () => userDependencies.registerAccountUseCase,
  (result) => UserMapper.toRegisterUserResponseDto(result)
)

export const getUserProfile = createUseCaseThunk(
  'user/get-user-profile',
  () => userDependencies.getUserProfileUseCase,
  (result) => UserMapper.toUserProfileResponseDto(result)
)
