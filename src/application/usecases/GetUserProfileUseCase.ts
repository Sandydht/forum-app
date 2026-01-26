import type UserProfile from "../../domain/users/entity/UserProfile";
import type UserRepository from "../../domain/users/UserRepository"

class GetUserProfileUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<UserProfile> {
    return await this.userRepository.getUserProfile()
  }
}

export default GetUserProfileUseCase
