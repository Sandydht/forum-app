import RegisterAccountUseCase from '../../../application/usecases/RegisterAccountUseCase'
import GetUserProfileUseCase from '../../../application/usecases/GetUserProfileUseCase'
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl'
import UserMapper from '../../../infrastructure/mappers/UserMapper'
import { createUseCaseThunk } from '../utils/createThunk'
import MethodAssertionImpl from '../../../infrastructure/utils/MethodAssertionImpl'

export const registerUser = createUseCaseThunk(
  'user/register-account',
  () => new RegisterAccountUseCase(
    new UserRepositoryImpl(),
    new MethodAssertionImpl()
  ),
  (result) => UserMapper.toRegisterUserResponseDto(result)
)

export const getUserProfile = createUseCaseThunk(
  'user/get-user-profile',
  () => new GetUserProfileUseCase(
    new UserRepositoryImpl(),
    new MethodAssertionImpl()
  ),
  (result) => UserMapper.toUserProfileResponseDto(result)
)
