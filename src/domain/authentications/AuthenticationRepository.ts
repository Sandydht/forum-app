/* eslint-disable @typescript-eslint/no-unused-vars */
import type UserLogin from "../users/entity/UserLogin";
import type NewAuth from "./entity/NewAuth";

class AuthenticationRepository {
  public async loginAccount(_payload: UserLogin): Promise<NewAuth> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

export default AuthenticationRepository;
