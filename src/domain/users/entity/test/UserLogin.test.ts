import { describe, it, expect } from 'vitest'
import UserLogin from '../UserLogin'

describe('UserLogin entity', () => {
  const validPayload = {
    username: 'sandydht',
    password: 'password123',
    captchaToken: 'captcha-token-123',
  }

  it('should throw error when username is empty', () => {
    expect(() =>
      new UserLogin(
        '',
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when password is empty', () => {
    expect(() =>
      new UserLogin(
        validPayload.username,
        '',
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when captcha token is empty', () => {
    expect(() =>
      new UserLogin(
        validPayload.username,
        validPayload.password,
        ''
      )
    ).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when username contains restricted character', () => {
    expect(() =>
      new UserLogin(
        'sandy@123',
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should throw error when username exceeds character limit', () => {
    expect(() =>
      new UserLogin(
        validPayload.username.repeat(50),
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.USERNAME_LIMIT_CHAR')
  })

  it('should throw error when password less than 8 characters', () => {
    expect(() =>
      new UserLogin(
        validPayload.username,
        'pass12',
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS')
  })

  it('should throw error when password does not contain letters and numbers', () => {
    expect(() =>
      new UserLogin(
        validPayload.username,
        'password',
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS')
  })

  it('should throw error when password contains space', () => {
    expect(() =>
      new UserLogin(
        validPayload.username,
        'pass word123',
        validPayload.captchaToken
      )
    ).toThrowError('USER_LOGIN.PASSWORD_MUST_NOT_CONTAIN_SPACE')
  })

  it('should create UserLogin correctly when payload is valid', () => {
    const userLogin = new UserLogin(
      validPayload.username,
      validPayload.password,
      validPayload.captchaToken
    )

    expect(userLogin.getUsername()).toBe(validPayload.username)
    expect(userLogin.getPassword()).toBe(validPayload.password)
    expect(userLogin.getCaptchaToken()).toBe(validPayload.captchaToken)
  })
})
