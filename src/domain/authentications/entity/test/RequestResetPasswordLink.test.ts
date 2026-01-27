import { describe, expect, it } from "vitest"
import RequestResetPasswordLink from "../RequestResetPasswordLink"

describe("RequestResetPasswordLink entity", () => {
  const validPayload = {
    email: 'example@email.com',
    captchaToken: 'valid-captcha-token'
  }

  it("should throw error when email is empty", () => {
    expect(() => 
      new RequestResetPasswordLink(
        '',
        validPayload.captchaToken
      )
    ).toThrowError('REQUEST_RESET_PASSWORD_LINK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it("should throw error when captcha token is empty", () => {
    expect(() => 
      new RequestResetPasswordLink(
        validPayload.email,
        ''
      )
    ).toThrowError('REQUEST_RESET_PASSWORD_LINK.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it("should throw error when email format is invalid", () => {
    expect(() => 
      new RequestResetPasswordLink(
        'invalid-email',
        validPayload.captchaToken
      )
    ).toThrowError('REQUEST_RESET_PASSWORD_LINK.EMAIL_IS_INVALID')
  })

  it("should create RequestResetPasswordLink correctly when payload is valid", () => {
    const requestResetPasswordLink = new RequestResetPasswordLink(
      validPayload.email,
      validPayload.captchaToken
    )

    expect(requestResetPasswordLink.getEmail()).toBe(validPayload.email)
    expect(requestResetPasswordLink.getCaptchaToken()).toBe(validPayload.captchaToken)
  })
})