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

export const resendPasswordResetToken = createUseCaseThunk(
  'auth/resend-password-reset-token',
  () => authDependencies.resendPasswordResetTokenUseCase,
  (result) => AuthMapper.toRequestedNewPasswordResetTokenResponseDto(result)
)

export const updatePassword = createUseCaseThunk(
  'auth/update-password',
  () => authDependencies.updatePasswordUseCase,
  (result) => AuthMapper.toUpdatedPasswordResponseDto(result)
)

export const validatePasswordResetToken = createUseCaseThunk(
  'auth/validate-password-reset-token',
  () => authDependencies.validatePasswordResetTokenUseCase,
  (result) => result
)