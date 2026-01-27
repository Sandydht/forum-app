import InputValidation from "../../utils/InputValidation";

class RequestedNewPasswordResetToken {
  private readonly message: string

  constructor(message: string) {
    this.verifyPayload(message)
    
    this.message = message;
  }

  private verifyPayload(message: string) {
    const notContainNeededPropertyErrorMessage = "REQUESTED_NEW_PASSWORD_RESET_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(message, notContainNeededPropertyErrorMessage);
  }

  public getMessage(): string {
    return this.message
  }
}

export default RequestedNewPasswordResetToken
