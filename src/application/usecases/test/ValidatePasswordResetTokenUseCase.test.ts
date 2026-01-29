import { describe, it, vi, expect } from "vitest"
import ValidatePasswordResetToken from "../../../domain/authentications/entity/ValidatePasswordResetToken"
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository";
import type MethodAssertion from "../../utils/MethodAssertion";
import ValidatePasswordResetTokenUseCase from "../ValidatePasswordResetTokenUseCase";

describe("ValidatePasswordResetTokenUseCase", () => {
  it("should orchestrate the validate password reset token action correctly", async () => {
    const validatePasswordResetToken: ValidatePasswordResetToken = new ValidatePasswordResetToken("valid-token");

    const mockAuthenticationRepository: AuthenticationRepository = {
      validatePasswordResetToken: vi.fn()
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const validatePasswordResetTokenUseCase: ValidatePasswordResetTokenUseCase = new ValidatePasswordResetTokenUseCase(
      mockAuthenticationRepository,
      mockMethodAssertion
    )

    await validatePasswordResetTokenUseCase.execute(validatePasswordResetToken)

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(mockAuthenticationRepository, "validatePasswordResetToken", "AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED")
    expect(mockAuthenticationRepository.validatePasswordResetToken).toHaveBeenCalledWith(validatePasswordResetToken)
  })
})
