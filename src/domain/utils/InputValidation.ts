class InputValidation {
  private static readonly USERNAME_PATTERN = /^[\w]+$/;
  private static readonly PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  private static readonly PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN = /.*\s.*/;
  private static readonly EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  private static readonly PHONE_NUMBER_PATTERN = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;

  static requireNotBlank(value: string, message: string): void {
    if (value == null || value.trim() === "") {
      throw new Error(message);
    }
  }

  static usernameLimitCharacter(username: string, message: string): void {
    if (username.length > 50) {
      throw new Error(message);
    }
  }

  static usernameNotContainRestrictedCharacter(username: string, message: string): void {
    if (!this.USERNAME_PATTERN.test(username)) {
      throw new Error(message);
    }
  }

  static passwordLimitCharacter(password: string, message: string): void {
    if (password.length < 8) {
      throw new Error(message);
    }
  }

  static passwordMustContainLettersAndNumber(password: string, message: string): void {
    if (!this.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN.test(password)) {
      throw new Error(message);
    }
  }

  static passwordMustNotContainSpace(password: string, message: string): void {
    if (this.PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN.test(password)) {
      throw new Error(message);
    }
  }

  static emailValidFormat(email: string, message: string): void {
    if (!this.EMAIL_PATTERN.test(email)) {
      throw new Error(message);
    }
  }

  static phoneNumberValidFormat(phoneNumber: string, message: string): void {
    if (!this.PHONE_NUMBER_PATTERN.test(phoneNumber)) {
      throw new Error(message);
    }
  }
}

export default InputValidation;
