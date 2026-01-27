import type AuthenticationRepository from "../../domain/authentications/AuthenticationRepository"
import type UpdatedPassword from "../../domain/authentications/entity/UpdatedPassword"
import type UpdatePassword from "../../domain/authentications/entity/UpdatePassword"
import type MethodAssertion from "../utils/MethodAssertion"

class UpdatePasswordUseCase {
  private readonly authenticationRepository: AuthenticationRepository
  private readonly methodAssertion: MethodAssertion

  constructor(authenticationRepository: AuthenticationRepository, methodAssertion: MethodAssertion) {
    this.authenticationRepository = authenticationRepository
    this.methodAssertion = methodAssertion
  }

  async execute(payload: UpdatePassword): Promise<UpdatedPassword> {
    this.methodAssertion.assertImplemented(this.authenticationRepository, 'updatePassword', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')

    return await this.authenticationRepository.updatePassword(payload)
  }
}

export default UpdatePasswordUseCase
