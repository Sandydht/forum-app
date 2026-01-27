import { describe, it, vi, expect } from "vitest"
import ResendPasswordResetToken from "../../../domain/authentications/entity/ResendPasswordResetToken"
import RequestedNewPasswordResetToken from "../../../domain/authentications/entity/RequestedNewPasswordResetToken"
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository"
import ResendPasswordResetTokenUseCase from "../ResendPasswordResetTokenUseCase"
import type MethodAssertion from "../../utils/MethodAssertion"

describe("ResendPasswordResetTokenUseCase", () => {
  it("should orchestrate the resend reset password token action correctly", async () => {
    const resendPasswordResetToken = new ResendPasswordResetToken('valid-token')

    const mockRequestedNewPasswordResetToken = new RequestedNewPasswordResetToken('If the email is registered, we will send password reset instructions')
    const mockAuthenticationRepository: AuthenticationRepository = {
      resendPasswordResetToken: vi.fn().mockResolvedValue(mockRequestedNewPasswordResetToken)
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const resendPasswordResetTokenUseCase: ResendPasswordResetTokenUseCase = new ResendPasswordResetTokenUseCase(mockAuthenticationRepository, mockMethodAssertion)

    const result: RequestedNewPasswordResetToken = await resendPasswordResetTokenUseCase.execute(resendPasswordResetToken)

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(mockAuthenticationRepository, 'resendPasswordResetToken', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    expect(mockAuthenticationRepository.resendPasswordResetToken).toHaveBeenCalledWith(resendPasswordResetToken)
    expect(result).toStrictEqual(mockRequestedNewPasswordResetToken)
  })
})
