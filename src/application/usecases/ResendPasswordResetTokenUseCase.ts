import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type RequestedNewPasswordResetToken from "../../domain/authentications/entity/RequestedNewPasswordResetToken"
import type ResendPasswordResetToken from "../../domain/authentications/entity/ResendPasswordResetToken"
import type MethodAssertion from "../utils/MethodAssertion"

class ResendPasswordResetTokenUseCase {
  private readonly authenticationRepository: AuthenticationRepository
  private readonly methodAssertion: MethodAssertion

  constructor(authenticationRepository: AuthenticationRepository, methodAssertion: MethodAssertion) {
    this.authenticationRepository = authenticationRepository
    this.methodAssertion = methodAssertion
  }

  async execute(payload: ResendPasswordResetToken): Promise<RequestedNewPasswordResetToken> {
    this.methodAssertion.assertImplemented(this.authenticationRepository, 'resendPasswordResetToken', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    return this.authenticationRepository.resendPasswordResetToken(payload)
  }
}

export default ResendPasswordResetTokenUseCase
