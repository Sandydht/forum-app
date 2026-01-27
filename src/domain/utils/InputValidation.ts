class InputValidation {
  private static readonly USERNAME_PATTERN = /^[\w]+$/;
  private static readonly PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  private static readonly PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN = /.*\s.*/;
  private static readonly EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  private static readonly PHONE_NUMBER_PATTERN = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
  private static readonly IPV4_PATTERN = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  private static readonly IPV6_PATTERN = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;
  private static readonly HOSTNAME_PATTERN = /^(localhost|(?:(?!\d+\.)[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,})$/;

  public static requireNotBlank(value: string, message: string): void {
    if (value == null || value.trim() === "") {
      throw new Error(message);
    }
  }

  public static usernameLimitCharacter(username: string, message: string): void {
    if (username.length > 50) {
      throw new Error(message);
    }
  }

  public static usernameNotContainRestrictedCharacter(username: string, message: string): void {
    if (!this.USERNAME_PATTERN.test(username)) {
      throw new Error(message);
    }
  }

  public static passwordLimitCharacter(password: string, message: string): void {
    if (password.length < 8) {
      throw new Error(message);
    }
  }

  public static passwordMustContainLettersAndNumber(password: string, message: string): void {
    if (!this.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN.test(password)) {
      throw new Error(message);
    }
  }

  public static passwordMustNotContainSpace(password: string, message: string): void {
    if (this.PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN.test(password)) {
      throw new Error(message);
    }
  }

  public static emailValidFormat(email: string, message: string): void {
    if (!this.EMAIL_PATTERN.test(email)) {
      throw new Error(message);
    }
  }

  public static phoneNumberValidFormat(phoneNumber: string, message: string): void {
    if (!this.PHONE_NUMBER_PATTERN.test(phoneNumber)) {
      throw new Error(message);
    }
  }

  public static validateIpAddress(ipAddress: string, message: string) {
    if (
      !this.IPV4_PATTERN.test(ipAddress) &&
      !this.IPV6_PATTERN.test(ipAddress) &&
      !this.HOSTNAME_PATTERN.test(ipAddress)
    ) {
      throw new Error(message);
    }
  }
}

export default InputValidation;
