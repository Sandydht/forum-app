import { describe, it, expect } from "vitest"
import UpdatePassword from "../UpdatePassword"

describe("UpdatePassword entity", () => {
  const validPayload = {
    newPassword: 'newPassword123',
    token: 'valid-token'
  }

  it('should throw error when newPassword is empty', () => {
    expect(() =>
      new UpdatePassword(
        '',
        validPayload.token
      )
    ).toThrowError('UPDATE_PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when token is empty', () => {
    expect(() =>
      new UpdatePassword(
        validPayload.newPassword,
        ''
      )
    ).toThrowError('UPDATE_PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when password less than 8 characters', () => {
    expect(() =>
      new UpdatePassword(
        'pass12',
        validPayload.token
      )
    ).toThrowError('UPDATE_PASSWORD.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS')
  })

  it('should throw error when password does not contain letters and numbers', () => {
    expect(() =>
      new UpdatePassword(
        'password',
        validPayload.token
      )
    ).toThrowError('UPDATE_PASSWORD.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS')
  })

  it('should throw error when password contains space', () => {
    expect(() =>
      new UpdatePassword(
        'pass word123',
        validPayload.token
      )
    ).toThrowError('UPDATE_PASSWORD.PASSWORD_MUST_NOT_CONTAIN_SPACE')
  })

  it('should create UserLogin correctly when payload is valid', () => {
    const updatePassword: UpdatePassword = new UpdatePassword(
      validPayload.newPassword,
      validPayload.token
    )

    expect(updatePassword.getNewPassword()).toBe(validPayload.newPassword)
    expect(updatePassword.getToken()).toBe(validPayload.token)
  })
})