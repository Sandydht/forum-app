import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type NewAuth from "../../domain/authentications/entity/NewAuth";
import UserLogin from "../../domain/users/entity/UserLogin";
import type SecureStorage from "../service/SecuredStorage";

class LoginAccountUseCase {
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly secureStorage: SecureStorage;

  constructor(
    authenticationRepository: AuthenticationRepository,
    secureStorage: SecureStorage
  ) {
    this.authenticationRepository = authenticationRepository;
    this.secureStorage = secureStorage;
  }

  async execute(payload: UserLogin): Promise<NewAuth> {
    const result: NewAuth = await this.authenticationRepository.loginAccount(payload);
    this.secureStorage.setSecureItem('accessToken', result.getAccessToken())
    this.secureStorage.setSecureItem('refreshToken', result.getRefreshToken())
    return result
  }
}

export default LoginAccountUseCase
