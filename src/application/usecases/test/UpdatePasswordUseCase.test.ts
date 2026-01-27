import { describe, expect, it, vi } from "vitest"
import UpdatePassword from "../../../domain/authentications/entity/UpdatePassword"
import UpdatedPassword from "../../../domain/authentications/entity/UpdatedPassword"
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository"
import type MethodAssertion from "../../utils/MethodAssertion"
import UpdatePasswordUseCase from "../UpdatePasswordUseCase"

describe("UpdatePasswordUseCase", () => {
  it("should orchestrate the update password action correctly", async () => {
    const updatePassword: UpdatePassword = new UpdatePassword('newPassword123', 'valid-token')

    const mockUpdatedPassword: UpdatedPassword = new UpdatedPassword('Your password was updated successfully. You can now sign in with your new password.')
    const mockAuthenticationRepository: AuthenticationRepository = {
      updatePassword: vi.fn().mockResolvedValue(mockUpdatedPassword)
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const updatePasswordUseCase: UpdatePasswordUseCase = new UpdatePasswordUseCase(mockAuthenticationRepository, mockMethodAssertion)

    const result: UpdatedPassword = await updatePasswordUseCase.execute(updatePassword)

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(mockAuthenticationRepository, 'updatePassword', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    expect(mockAuthenticationRepository.updatePassword).toHaveBeenCalledWith(updatePassword)
    expect(result).toStrictEqual(mockUpdatedPassword)
  })
})