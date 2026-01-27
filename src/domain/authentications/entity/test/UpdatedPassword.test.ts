import { describe, it, expect } from "vitest"
import UpdatedPassword from "../UpdatedPassword"

describe("UpdatedPassword entity", () => {
  const validPayload = {
    message: 'Your password was updated successfully. You can now sign in with your new password.'
  }

  it('should throw error when message is empty', () => {
    expect(() =>
      new UpdatedPassword(
        ''
      )
    ).toThrowError('UPDATED_PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should create RequestedNewPasswordResetToken correctly when payload is valid', () => {
    const updatedPassword: UpdatedPassword = new UpdatedPassword(
      validPayload.message
    )

    expect(updatedPassword.getMessage()).toBe(validPayload.message)
  })
})
