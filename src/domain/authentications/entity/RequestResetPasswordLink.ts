import InputValidation from "../../utils/InputValidation"

class RequestResetPasswordLink {
  private readonly email: string
  private readonly captchaToken: string

  constructor(email: string, captchaToken: string) {
    this.verifyPayload(email, captchaToken)

    this.email = email
    this.captchaToken = captchaToken
  }

  private verifyPayload(email: string, captchaToken: string) {
    const notContainNeededPropertyErrorMessage = "REQUEST_RESET_PASSWORD_LINK.NOT_CONTAIN_NEEDED_PROPERTY";
    const emailInvalidErrorMessage = "REQUEST_RESET_PASSWORD_LINK.EMAIL_IS_INVALID";

    InputValidation.requireNotBlank(email, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(captchaToken, notContainNeededPropertyErrorMessage);

    InputValidation.emailValidFormat(email, emailInvalidErrorMessage);
  }

  public getEmail(): string {
    return this.email
  }

  public getCaptchaToken(): string {
    return this.captchaToken
  }
}

export default RequestResetPasswordLink
