import InputValidation from "../../utils/InputValidation";

class UserLogin {
  private readonly username: string
  private readonly password: string
  private readonly captchaToken: string
  
  constructor(username: string, password: string, captchaToken: string) {
    this.verifyPayload(username, password, captchaToken)

    this.username = username;
    this.password = password;
    this.captchaToken = captchaToken;
  }

  private verifyPayload(username: string, password: string, captchaToken: string) {
    const notContainNeededPropertyErrorMessage = "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY";
    const containRestrictedCharacterErrorMessage = "USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER";
    const limitCharErrorMessage = "USER_LOGIN.USERNAME_LIMIT_CHAR";
    const passwordLimitCharErrorMessage = "USER_LOGIN.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS";
    const passwordMustContainLettersAndNumbersErrorMessage = "USER_LOGIN.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS";
    const passwordMustContainSpaceErrorMessage = "USER_LOGIN.PASSWORD_MUST_NOT_CONTAIN_SPACE";

    InputValidation.requireNotBlank(username, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(password, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(captchaToken, notContainNeededPropertyErrorMessage);

    InputValidation.usernameNotContainRestrictedCharacter(username, containRestrictedCharacterErrorMessage);
    InputValidation.usernameLimitCharacter(username, limitCharErrorMessage);

    InputValidation.passwordLimitCharacter(password, passwordLimitCharErrorMessage);
    InputValidation.passwordMustContainLettersAndNumber(password, passwordMustContainLettersAndNumbersErrorMessage);
    InputValidation.passwordMustNotContainSpace(password, passwordMustContainSpaceErrorMessage);
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getCaptchaToken(): string {
    return this.captchaToken;
  }
}

export default UserLogin
