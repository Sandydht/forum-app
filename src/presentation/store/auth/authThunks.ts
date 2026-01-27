import { authDependencies } from "../../../infrastructure/container"
import { createUseCaseThunk } from "../utils/createThunk"
import AuthMapper from "../../../infrastructure/mappers/AuthMapper"

export const loginAccount = createUseCaseThunk(
  'auth/login-account',
  () => authDependencies.loginAccountUseCase,
  (result) => AuthMapper.toUserLoginResponseDto(result)
)

export const requestResetPasswordLink = createUseCaseThunk(
  'auth/request-reset-password-link',
  () => authDependencies.requestResetPasswordLinkUseCase,
  (result) => AuthMapper.toRequestResetPasswordLinkResponseDto(result)
)