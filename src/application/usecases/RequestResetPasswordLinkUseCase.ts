import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type RequestedResetPasswordLink from "../../domain/authentications/entity/RequestedResetPasswordLink"
import type RequestResetPasswordLink from "../../domain/authentications/entity/RequestResetPasswordLink"
import type MethodAssertion from "../utils/MethodAssertion"

class RequestResetPasswordLinkUseCase {
  private readonly authenticationRepository: AuthenticationRepository
  private readonly methodAssertion: MethodAssertion

  constructor(authenticationRepository: AuthenticationRepository, methodAssertion: MethodAssertion) {
    this.authenticationRepository = authenticationRepository
    this.methodAssertion = methodAssertion
  }

  async execute(payload: RequestResetPasswordLink): Promise<RequestedResetPasswordLink> {
    this.methodAssertion.assertImplemented(this.authenticationRepository, 'requestResetPasswordLink', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    
    return await this.authenticationRepository.requestResetPasswordLink(payload)
  }
}

export default RequestResetPasswordLinkUseCase
