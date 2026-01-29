import InputValidation from "../../utils/InputValidation";

class ValidatePasswordResetToken {
  private readonly token: string

    constructor(token: string) {
    this.verifyPayload(token);

    this.token = token;
  }

  private verifyPayload(token: string) {
    const notContainNeededPropertyErrorMessage = "VALIDATE_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(token, notContainNeededPropertyErrorMessage);
  }

  public getToken(): string {
    return this.token
  }
}

export default ValidatePasswordResetToken
