import { describe, it, expect } from "vitest"
import UserProfile from "../UserProfile"

describe("UserProfile entity", () => {
  const validPayload = {
    id: 'user-123',
    username: 'user',
    fullname: 'Fullname'
  }

  it('should throw error when id is empty', () => {
    expect(() =>
      new UserProfile(
        '',
        validPayload.username,
        validPayload.fullname
      )
    ).toThrowError('USER_PROFILE.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when username is empty', () => {
    expect(() =>
      new UserProfile(
        validPayload.id,
        '',
        validPayload.fullname
      )
    ).toThrowError('USER_PROFILE.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when fullname is empty', () => {
    expect(() =>
      new UserProfile(
        validPayload.id,
        validPayload.username,
        ''
      )
    ).toThrowError('USER_PROFILE.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when username contains restricted character', () => {
    expect(() =>
      new UserProfile(
        validPayload.id,
        'user@123',
        validPayload.fullname
      )
    ).toThrowError('USER_PROFILE.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should throw error when username exceeds character limit', () => {
    expect(() =>
      new UserProfile(
        validPayload.id,
        validPayload.username.repeat(50),
        validPayload.fullname
      )
    ).toThrowError('USER_PROFILE.USERNAME_LIMIT_CHAR')
  })

  it('should create UserProfile correctly when payload is valid', () => {
    const userLogin = new UserProfile(
      validPayload.id,
      validPayload.username,
      validPayload.fullname
    )

    expect(userLogin.getId()).toStrictEqual(validPayload.id)
    expect(userLogin.getUsername()).toStrictEqual(validPayload.username)
    expect(userLogin.getFullname()).toStrictEqual(validPayload.fullname)
  })
})
