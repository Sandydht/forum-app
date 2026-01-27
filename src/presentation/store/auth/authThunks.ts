import LoginAccountUseCase from "../../../application/usecases/LoginAccountUseCase"
import RequestResetPasswordLinkUseCase from "../../../application/usecases/RequestResetPasswordLinkUseCase"
import AuthMapper from "../../../infrastructure/mappers/AuthMapper"
import AuthenticationRepositoryImpl from "../../../infrastructure/repositories/AuthenticationRepositoryImpl"
import MethodAssertionImpl from "../../../infrastructure/utils/MethodAssertionImpl"
import SecureStorageImpl from "../../../infrastructure/utils/SecureStorageImpl"
import { createUseCaseThunk } from "../utils/createThunk"

export const loginAccount = createUseCaseThunk(
  'auth/login-account',
  () => new LoginAccountUseCase(
    new AuthenticationRepositoryImpl(), 
    new SecureStorageImpl(),
    new MethodAssertionImpl()
  ),
  (result) => AuthMapper.toUserLoginResponseDto(result)
)

export const requestResetPasswordLink = createUseCaseThunk(
  'auth/request-reset-password-link',
  () => new RequestResetPasswordLinkUseCase(
    new AuthenticationRepositoryImpl(), 
    new MethodAssertionImpl()
  ),
  (result) => AuthMapper.toRequestResetPasswordLinkResponseDto(result)
)