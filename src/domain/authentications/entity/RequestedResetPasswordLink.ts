import InputValidation from "../../utils/InputValidation";

class RequestedResetPasswordLink {
  private readonly message: string

  constructor(message: string) {
    this.verifyPayload(message)

    this.message = message
  }

  private verifyPayload(message: string) {
    const notContainNeededPropertyErrorMessage = "REQUESTED_RESET_PASSWORD_LINK.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(message, notContainNeededPropertyErrorMessage);
  }

  public getMessage(): string {
    return this.message
  }
}

export default RequestedResetPasswordLink
