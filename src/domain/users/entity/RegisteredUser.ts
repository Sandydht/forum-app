import InputValidation from "../../utils/InputValidation";

class RegisteredUser {
  private readonly id: string;
  private readonly username: string;
  private readonly email: string;
  private readonly phoneNumber: string;
  private readonly fullname: string;

  constructor(id: string, username: string, email: string, phoneNumber: string, fullname: string) {
    this.verifyPayload(id, username, email, phoneNumber, fullname);

    this.id = id;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullname = fullname;
  }

  private verifyPayload(id: string, username: string, email: string, phoneNumber: string, fullname: string): void {
    const notContainNeededPropertyErrorMessage = "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY";
    const containRestrictedCharacterErrorMessage = "REGISTERED_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER";
    const limitCharErrorMessage = "REGISTERED_USER.USERNAME_LIMIT_CHAR";
    const emailInvalidErrorMessage = "REGISTERED_USER.EMAIL_IS_INVALID";
    const phoneNumberInvalidErrorMessage = "REGISTERED_USER.PHONE_NUMBER_IS_INVALID";

    InputValidation.requireNotBlank(id, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(username, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(email, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(phoneNumber, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(fullname, notContainNeededPropertyErrorMessage);

    InputValidation.usernameNotContainRestrictedCharacter(username, containRestrictedCharacterErrorMessage);
    InputValidation.usernameLimitCharacter(username, limitCharErrorMessage);

    InputValidation.emailValidFormat(email, emailInvalidErrorMessage);
    InputValidation.phoneNumberValidFormat(phoneNumber, phoneNumberInvalidErrorMessage);
  }

  getId(): string {
    return this.id;
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
}

export default RegisteredUser;
