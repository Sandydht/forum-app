import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type NewAuth from "../../domain/authentications/entity/NewAuth";
import UserLogin from "../../domain/users/entity/UserLogin";

class LoginAccountUseCase {
  private readonly authenticationRepository: AuthenticationRepository

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(payload: UserLogin): Promise<NewAuth> {
    return await this.authenticationRepository.loginAccount(payload);
  }
}

export default LoginAccountUseCase
