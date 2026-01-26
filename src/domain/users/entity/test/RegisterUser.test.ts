import { describe, it, expect } from "vitest";
import RegisterUser from "../RegisterUser";

describe("RegisterUser Entity", () => {
  const validPayload = {
    username: 'user',
    email: 'example@email.com',
    phoneNumber: '081234567890',
    fullname: 'Fullname',
    password: 'password123',
    captchaToken: 'valid-captcha-token'
  }

  it('should throw error when required property is missing', () => {
    expect(() =>
      new RegisterUser(
        '',
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when username contains restricted character', () => {
    expect(() =>
      new RegisterUser(
        'sandy@123',
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should throw error when username exceeds character limit', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username.repeat(51),
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR')
  })

  it('should throw error when email format is invalid', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username,
        'invalid-email',
        validPayload.phoneNumber,
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.EMAIL_IS_INVALID')
  })

  it('should throw error when phone number format is invalid', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username,
        validPayload.email,
        'abc123',
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.PHONE_NUMBER_IS_INVALID')
  })

  it('should throw error when password less than 8 characters', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username,
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        'pass12',
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS')
  })

  it('should throw error when password does not contain letters and numbers', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username,
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        'password',
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS')
  })

  it('should throw error when password contains space', () => {
    expect(() =>
      new RegisterUser(
        validPayload.username,
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        'pass word123',
        validPayload.captchaToken
      )
    ).toThrowError('REGISTER_USER.PASSWORD_MUST_NOT_CONTAIN_SPACE')
  })

  it('should create RegisterUser correctly when payload is valid', () => {
    const registerUser = new RegisterUser(
      validPayload.username,
      validPayload.email,
      validPayload.phoneNumber,
      validPayload.fullname,
      validPayload.password,
      validPayload.captchaToken
    )

    expect(registerUser.getUsername()).toBe(validPayload.username)
    expect(registerUser.getEmail()).toBe(validPayload.email)
    expect(registerUser.getPhoneNumber()).toBe(validPayload.phoneNumber)
    expect(registerUser.getFullname()).toBe(validPayload.fullname)
    expect(registerUser.getPassword()).toBe(validPayload.password)
    expect(registerUser.getCaptchaToken()).toBe(validPayload.captchaToken)
  })
});
