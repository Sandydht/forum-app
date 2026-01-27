import type RegisteredUser from "../../domain/users/entity/RegisteredUser";
import RegisterUser from "../../domain/users/entity/RegisterUser";
import type UserRepository from "../../domain/users/UserRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class RegisterAccountUseCase {
  private readonly userRepository: UserRepository;
  private readonly methodAssertion: MethodAssertion;

  constructor(userRepository: UserRepository, methodAssertion: MethodAssertion) {
    this.userRepository = userRepository;
    this.methodAssertion = methodAssertion;
  }

  async execute(payload: RegisterUser): Promise<RegisteredUser> {
    this.methodAssertion.assertImplemented(this.userRepository, 'registerAccount', 'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    
    return await this.userRepository.registerAccount(payload);
  }
} 

export default RegisterAccountUseCase;
