import InputValidation from "../../utils/InputValidation";

class RegisterUser {
  private readonly username: string;
  private readonly email: string;
  private readonly phoneNumber: string;
  private readonly fullname: string;
  private readonly password: string;
  private readonly captchaToken: string;

  constructor(username: string, email: string, phoneNumber: string, fullname: string, password: string, captchaToken: string) {
    this.verifyPayload(username, email, phoneNumber, fullname, password, captchaToken);

    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullname = fullname;
    this.password = password;
    this.captchaToken = captchaToken;
  }

  private verifyPayload(username: string, email: string, phoneNumber: string, fullname: string, password: string, captchaToken: string): void {
    const notContainNeededPropertyErrorMessage = "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY";
    const containRestrictedCharacterErrorMessage = "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER";
    const limitCharErrorMessage = "REGISTER_USER.USERNAME_LIMIT_CHAR";
    const emailInvalidErrorMessage = "REGISTER_USER.EMAIL_IS_INVALID";
    const phoneNumberInvalidErrorMessage = "REGISTER_USER.PHONE_NUMBER_IS_INVALID";
    const passwordLimitCharErrorMessage = "REGISTER_USER.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS";
    const passwordMustContainLettersAndNumbersErrorMessage = "REGISTER_USER.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS";
    const passwordMustContainSpaceErrorMessage = "REGISTER_USER.PASSWORD_MUST_NOT_CONTAIN_SPACE";

    InputValidation.requireNotBlank(username, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(email, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(phoneNumber, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(fullname, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(password, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(captchaToken, notContainNeededPropertyErrorMessage);

    InputValidation.usernameNotContainRestrictedCharacter(username, containRestrictedCharacterErrorMessage);
    InputValidation.usernameLimitCharacter(username, limitCharErrorMessage);

    InputValidation.emailValidFormat(email, emailInvalidErrorMessage);
    InputValidation.phoneNumberValidFormat(phoneNumber, phoneNumberInvalidErrorMessage);
    
    InputValidation.passwordLimitCharacter(password, passwordLimitCharErrorMessage);
    InputValidation.passwordMustContainLettersAndNumber(password, passwordMustContainLettersAndNumbersErrorMessage);
    InputValidation.passwordMustNotContainSpace(password, passwordMustContainSpaceErrorMessage);
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }
  
  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getFullname(): string {
    return this.fullname;
  }

  getPassword(): string {
    return this.password;
  }

  getCaptchaToken(): string {
    return this.captchaToken;
  }
}

export default RegisterUser;
