import InputValidation from "../../utils/InputValidation";

class UpdatedPassword {
  private readonly message: string

  constructor(message: string) {
    this.verifyPayload(message)
    this.message = message
  }

  private verifyPayload(message: string) {
    const notContainNeededPropertyErrorMessage = "UPDATED_PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(message, notContainNeededPropertyErrorMessage);
  }

  public getMessage(): string {
    return this.message
  }
}

export default UpdatedPassword