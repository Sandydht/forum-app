import type UserProfile from "../../domain/users/entity/UserProfile";
import type UserRepository from "../../domain/users/UserRepository"
import type MethodAssertion from "../utils/MethodAssertion";

class GetUserProfileUseCase {
  private readonly userRepository: UserRepository
  private readonly methodAssertion: MethodAssertion

  constructor(userRepository: UserRepository, methodAssertion: MethodAssertion) {
    this.userRepository = userRepository;
    this.methodAssertion = methodAssertion;
  }

  async execute(): Promise<UserProfile> {
    this.methodAssertion.assertImplemented(this.userRepository, 'getUserProfile', 'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')

    return await this.userRepository.getUserProfile()
  }
}

export default GetUserProfileUseCase
