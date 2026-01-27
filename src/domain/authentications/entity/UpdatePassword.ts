import InputValidation from "../../utils/InputValidation";

class UpdatePassword {
  private readonly newPassword: string
  private readonly token: string

  constructor(newPassword: string, token: string) {
    this.verifyPayload(newPassword, token)

    this.newPassword = newPassword
    this.token = token
  }

  private verifyPayload(newPassword: string, token: string) {
    const notContainNeededPropertyErrorMessage = "UPDATE_PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY";
    const passwordLimitCharErrorMessage = "UPDATE_PASSWORD.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS";
    const passwordMustContainLettersAndNumbersErrorMessage = "UPDATE_PASSWORD.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS";
    const passwordMustContainSpaceErrorMessage = "UPDATE_PASSWORD.PASSWORD_MUST_NOT_CONTAIN_SPACE";

    InputValidation.requireNotBlank(newPassword, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(token, notContainNeededPropertyErrorMessage);

    InputValidation.passwordLimitCharacter(newPassword, passwordLimitCharErrorMessage);
    InputValidation.passwordMustContainLettersAndNumber(newPassword, passwordMustContainLettersAndNumbersErrorMessage);
    InputValidation.passwordMustNotContainSpace(newPassword, passwordMustContainSpaceErrorMessage);
  }

  public getNewPassword(): string {
    return this.newPassword
  }

  public getToken(): string {
    return this.token
  }
}

export default UpdatePassword
