import GetUserProfileUseCase from "../application/usecases/GetUserProfileUseCase";
import LoginAccountUseCase from "../application/usecases/LoginAccountUseCase";
import RegisterAccountUseCase from "../application/usecases/RegisterAccountUseCase";
import RequestResetPasswordLinkUseCase from "../application/usecases/RequestResetPasswordLinkUseCase";
import ResendPasswordResetTokenUseCase from "../application/usecases/ResendPasswordResetTokenUseCase";
import UpdatePasswordUseCase from "../application/usecases/UpdatePasswordUseCase";
import ValidatePasswordResetTokenUseCase from "../application/usecases/ValidatePasswordResetTokenUseCase";
import AuthenticationRepositoryImpl from "./repositories/AuthenticationRepositoryImpl";
import UserRepositoryImpl from "./repositories/UserRepositoryImpl";
import MethodAssertionImpl from "./utils/MethodAssertionImpl";
import SecureStorageImpl from "./utils/SecureStorageImpl";

const authenticationRepositoryImpl: AuthenticationRepositoryImpl = new AuthenticationRepositoryImpl();
const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl();
const methodAssertionImpl: MethodAssertionImpl = new MethodAssertionImpl();

export const authDependencies = {
  loginAccountUseCase: new LoginAccountUseCase(authenticationRepositoryImpl, secureStorageImpl, methodAssertionImpl),
  requestResetPasswordLinkUseCase: new RequestResetPasswordLinkUseCase(authenticationRepositoryImpl, methodAssertionImpl),
  resendPasswordResetTokenUseCase: new ResendPasswordResetTokenUseCase(authenticationRepositoryImpl, methodAssertionImpl),
  updatePasswordUseCase: new UpdatePasswordUseCase(authenticationRepositoryImpl, methodAssertionImpl),
  validatePasswordResetTokenUseCase: new ValidatePasswordResetTokenUseCase(authenticationRepositoryImpl, methodAssertionImpl)
}

export const userDependencies = {
  registerAccountUseCase: new RegisterAccountUseCase(userRepositoryImpl, methodAssertionImpl),
  getUserProfileUseCase: new GetUserProfileUseCase(userRepositoryImpl, methodAssertionImpl),
}