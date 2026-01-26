/* eslint-disable @typescript-eslint/no-unused-vars */
import type RegisteredUser from "./entity/RegisteredUser";
import type RegisterUser from "./entity/RegisterUser";

class UserRepository {
  public async registerAccount(_payload: RegisterUser): Promise<RegisteredUser> {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

export default UserRepository;
