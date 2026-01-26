import { describe, it, expect } from "vitest";  
import RegisteredUser from "../RegisteredUser";

describe("RegisteredUser Entity", () => {
  const validPayload = {
    id: 'user-123',
    username: 'sandydht',
    email: 'sandy@mail.com',
    phoneNumber: '081234567890',
    fullname: 'Sandy DHT'
  };
  
  it('should throw error when required property is missing', () => {
    expect(() =>
      new RegisteredUser(
        '',
        validPayload.username,
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname
      )
    ).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when username contains restricted character', () => {
    expect(() =>
      new RegisteredUser(
        validPayload.id,
        'sandy@123',
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname
      )
    ).toThrowError('REGISTERED_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should throw error when username exceeds character limit', () => {
    expect(() =>
      new RegisteredUser(
        validPayload.id,
        validPayload.username.repeat(51),
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname
      )
    ).toThrowError('REGISTERED_USER.USERNAME_LIMIT_CHAR')
  })

  it('should throw error when email format is invalid', () => {
    expect(() =>
      new RegisteredUser(
        validPayload.id,
        validPayload.username,
        'invalid-email',
        validPayload.phoneNumber,
        validPayload.fullname
      )
    ).toThrowError('REGISTERED_USER.EMAIL_IS_INVALID')
  })

  it('should throw error when phone number format is invalid', () => {
    expect(() =>
      new RegisteredUser(
        validPayload.id,
        validPayload.username,
        validPayload.email,
        'abc123',
        validPayload.fullname
      )
    ).toThrowError('REGISTERED_USER.PHONE_NUMBER_IS_INVALID')
  })

  it('should create RegisteredUser correctly when payload is valid', () => {
    const registeredUser = new RegisteredUser(
      validPayload.id,
      validPayload.username,
      validPayload.email,
      validPayload.phoneNumber,
      validPayload.fullname
    )

    expect(registeredUser.getId()).toBe(validPayload.id)
    expect(registeredUser.getUsername()).toBe(validPayload.username)
    expect(registeredUser.getEmail()).toBe(validPayload.email)
    expect(registeredUser.getPhoneNumber()).toBe(validPayload.phoneNumber)
    expect(registeredUser.getFullname()).toBe(validPayload.fullname)
  })
});