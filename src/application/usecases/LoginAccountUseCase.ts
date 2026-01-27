import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type NewAuth from "../../domain/authentications/entity/NewAuth";
import UserLogin from "../../domain/users/entity/UserLogin";
import type MethodAssertion from "../utils/MethodAssertion";
import type SecureStorage from "../utils/SecuredStorage";

class LoginAccountUseCase {
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly secureStorage: SecureStorage;
  private readonly methodAssertion: MethodAssertion;

  constructor(
    authenticationRepository: AuthenticationRepository,
    secureStorage: SecureStorage,
    methodAssertion: MethodAssertion
  ) {
    this.authenticationRepository = authenticationRepository;
    this.secureStorage = secureStorage;
    this.methodAssertion = methodAssertion;
  }

  async execute(payload: UserLogin): Promise<NewAuth> {
    this.methodAssertion.assertImplemented(this.authenticationRepository, 'loginAccount', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    this.methodAssertion.assertImplemented(this.secureStorage, 'setSecureItem', 'SECURE_STORAGE.METHOD_NOT_IMPLEMENTED')

    const result: NewAuth = await this.authenticationRepository.loginAccount(payload);
    this.secureStorage.setSecureItem('accessToken', result.getAccessToken());
    this.secureStorage.setSecureItem('refreshToken', result.getRefreshToken());
    return result
  }
}

export default LoginAccountUseCase
