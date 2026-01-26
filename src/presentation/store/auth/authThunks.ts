import LoginAccountUseCase from "../../../application/usecases/LoginAccountUseCase"
import AuthMapper from "../../../infrastructure/mappers/AuthMapper"
import AuthenticationRepositoryImpl from "../../../infrastructure/repositories/AuthenticationRepositoryImpl"
import SecureStorageImpl from "../../../infrastructure/service/SecureStorageImpl"
import { createUseCaseThunk } from "../utils/createThunk"

export const loginAccount = createUseCaseThunk(
  'auth/login-account',
  () => new LoginAccountUseCase(new AuthenticationRepositoryImpl(), new SecureStorageImpl()),
  (result) => AuthMapper.toUserLoginResponseDto(result)
)