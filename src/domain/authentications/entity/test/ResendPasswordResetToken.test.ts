import { describe, it, expect } from "vitest"
import ResendPasswordResetToken from "../ResendPasswordResetToken"

describe("ResendPasswordResetToken entity", () => {
  const validPayload = {
    token: 'valid-token'
  }

  it('should throw error when token is empty', () => {
    expect(() =>
      new ResendPasswordResetToken(
        ''
      )
    ).toThrowError('RESEND_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should create ResendPasswordResetToken correctly when payload is valid', () => {
    const resendPasswordResetToken = new ResendPasswordResetToken(
      validPayload.token
    )

    expect(resendPasswordResetToken.getToken()).toBe(validPayload.token)
  })
})
