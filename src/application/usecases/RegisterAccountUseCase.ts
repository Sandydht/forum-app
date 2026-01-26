import type RegisteredUser from "../../domain/users/entity/RegisteredUser";
import RegisterUser from "../../domain/users/entity/RegisterUser";
import type UserRepository from "../../domain/users/UserRepository";

class RegisterAccountUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(payload: RegisterUser): Promise<RegisteredUser> {
    return await this.userRepository.registerAccount(payload);
  }
} 

export default RegisterAccountUseCase;
