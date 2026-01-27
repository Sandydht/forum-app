import { describe, it, expect } from "vitest"
import RequestedNewPasswordResetToken from "../RequestedNewPasswordResetToken"

describe("RequestedNewPasswordResetToken entity", () => {
  const validPayload = {
    message: 'If the email is registered, we will send password reset instructions'
  }

  it('should throw error when message is empty', () => {
    expect(() =>
      new RequestedNewPasswordResetToken(
        ''
      )
    ).toThrowError('REQUESTED_NEW_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should create RequestedNewPasswordResetToken correctly when payload is valid', () => {
    const requestedNewPasswordResetToken = new RequestedNewPasswordResetToken(
      validPayload.message
    )

    expect(requestedNewPasswordResetToken.getMessage()).toBe(validPayload.message)
  })
})
