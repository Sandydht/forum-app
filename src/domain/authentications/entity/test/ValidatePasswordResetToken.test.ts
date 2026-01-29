import { describe, it, expect } from "vitest"
import ValidatePasswordResetToken from "../ValidatePasswordResetToken"

describe("ValidatePasswordResetToken entity", () => {
  const validPayload = {
    token: 'valid-token'
  }

  it('should throw error when token is empty', () => {
    expect(() =>
      new ValidatePasswordResetToken(
        ''
      )
    ).toThrowError('VALIDATE_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should create ResendPasswordResetToken correctly when payload is valid', () => {
    const resendPasswordResetToken = new ValidatePasswordResetToken(
      validPayload.token
    )

    expect(resendPasswordResetToken.getToken()).toBe(validPayload.token)
  })
})
