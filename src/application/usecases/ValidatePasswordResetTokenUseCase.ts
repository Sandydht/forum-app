import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type ValidatePasswordResetToken from "../../domain/authentications/entity/ValidatePasswordResetToken"
import type MethodAssertion from "../utils/MethodAssertion"

class ValidatePasswordResetTokenUseCase {
  private readonly authenticationRepository: AuthenticationRepository
  private readonly methodAssertion: MethodAssertion

  constructor(authenticationRepository: AuthenticationRepository, methodAssertion: MethodAssertion) {
    this.authenticationRepository = authenticationRepository
    this.methodAssertion = methodAssertion
  }

  async execute(payload: ValidatePasswordResetToken) {
    this.methodAssertion.assertImplemented(this.authenticationRepository, "validatePasswordResetToken", "AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    
    await this.authenticationRepository.validatePasswordResetToken(payload)
  }
}

export default ValidatePasswordResetTokenUseCase
