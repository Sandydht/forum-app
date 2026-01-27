import InputValidation from "../../utils/InputValidation";

class ResendPasswordResetToken {
  private readonly token: string

  constructor(token: string) {
    this.verifyPayload(token);

    this.token = token;
  }

  private verifyPayload(token: string) {
    const notContainNeededPropertyErrorMessage = "RESEND_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(token, notContainNeededPropertyErrorMessage);
  }

  public getToken(): string {
    return this.token
  }
}

export default ResendPasswordResetToken
