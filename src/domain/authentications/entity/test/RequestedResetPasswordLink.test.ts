import { describe, it, expect } from "vitest"
import RequestedResetPasswordLink from "../RequestedResetPasswordLink"

describe("RequestedResetPasswordLink entity", () => {
  const validPayload = {
    message: 'If the email is registered, we will send password reset instructions'
  }

  it("should throw error when message is empty", () => {
    expect(() => 
      new RequestedResetPasswordLink(
        ''
      )
    ).toThrowError('REQUESTED_RESET_PASSWORD_LINK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it("should create RequestedResetPasswordLink correctly when payload is valid", () => {
    const requestedResetPasswordLink = new RequestedResetPasswordLink(
      validPayload.message
    )

    expect(requestedResetPasswordLink.getMessage()).toBe(validPayload.message)
  })
})
