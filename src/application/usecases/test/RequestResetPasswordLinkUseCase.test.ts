import { describe, expect, it, vi } from "vitest"
import RequestResetPasswordLink from "../../../domain/authentications/entity/RequestResetPasswordLink"
import RequestedResetPasswordLink from "../../../domain/authentications/entity/RequestedResetPasswordLink"
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository"
import RequestResetPasswordLinkUseCase from "../RequestResetPasswordLinkUseCase"
import type MethodAssertion from "../../utils/MethodAssertion"

describe("RequestResetPasswordLinkUseCase", () => {
  it("should orchestrate the request reset password link action correctly", async () => {
    const requestResetPasswordLink = new RequestResetPasswordLink(
      'example@email.com',
      '192.168.1.1',
    )

    const mockRequestedResetPasswordLink = new RequestedResetPasswordLink('If the email is registered, we will send password reset instructions')
    const mockAuthenticationRepository: AuthenticationRepository = {
      requestResetPasswordLink: vi.fn().mockResolvedValue(mockRequestedResetPasswordLink)
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const requestResetPasswordLinkUseCase: RequestResetPasswordLinkUseCase = new RequestResetPasswordLinkUseCase(mockAuthenticationRepository, mockMethodAssertion)

    const result: RequestedResetPasswordLink = await requestResetPasswordLinkUseCase.execute(requestResetPasswordLink)

    expect(mockAuthenticationRepository.requestResetPasswordLink).toHaveBeenCalledWith(requestResetPasswordLink)
    expect(result).toStrictEqual(mockRequestedResetPasswordLink)
  })
})