import { describe, it, expect } from "vitest";
import InputValidation from "../InputValidation";

describe("InputValidation Utils", () => {
  describe("requireNotBlank function", () => {
    const errorMessage = "VALUE_MUST_NOT_BE_BLANK"

    it("should throw an error when the input is null", () => {
      expect(() => InputValidation.requireNotBlank(null as unknown as string, errorMessage)).toThrowError(errorMessage)
    });

    it("should throw an error when the input is an empty string", () => {
      expect(() => InputValidation.requireNotBlank("", errorMessage)).toThrowError(errorMessage)
    });

    it("should throw an error when the input is a string with only spaces", () => {
      expect(() => InputValidation.requireNotBlank("     ", errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the input is a non-blank string", () => {
      expect(() => InputValidation.requireNotBlank("valid input", errorMessage)).not.toThrowError();
    });
  });

  describe("usernameLimitCharacter function", () => {
    const errorMessage = "USERNAME_EXCEEDS_MAX_LENGTH"

    it("should throw an error when the username exceeds 50 characters", () => {
      const longUsername = "a".repeat(51);
      expect(() => InputValidation.usernameLimitCharacter(longUsername, errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the username is within the limit", () => {
      const validUsername = "validUsername";
      expect(() => InputValidation.usernameLimitCharacter(validUsername, errorMessage)).not.toThrowError();
    });
  });

  describe("usernameNotContainRestrictedCharacter function", () => {
    const errorMessage = "USERNAME_CONTAINS_RESTRICTED_CHARACTERS"

    it("should throw an error when the username contains restricted characters", () => {
      const invalidUsername = "invalid$username!";
      expect(() => InputValidation.usernameNotContainRestrictedCharacter(invalidUsername, errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the username contains only allowed characters", () => {
      const validUsername = "valid_username123";
      expect(() => InputValidation.usernameNotContainRestrictedCharacter(validUsername, errorMessage)).not.toThrowError();
    });
  });

  describe("passwordLimitCharacter function", () => {
    const errorMessage = "PASSWORD_TOO_SHORT"

    it("should throw an error when the password is shorter than 8 characters", () => {
      const shortPassword = "Pass1";
      expect(() => InputValidation.passwordLimitCharacter(shortPassword, errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the password meets the minimum length", () => {
      const validPassword = "Password1";
      expect(() => InputValidation.passwordLimitCharacter(validPassword, errorMessage)).not.toThrowError();
    });
  });

  describe("passwordMustContainLettersAndNumber function", () => {
    const errorMessage = "PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS"

    it("should throw an error when the password does not contain both letters and numbers", () => {
      const invalidPassword1 = "Password"; // No numbers
      const invalidPassword2 = "12345678"; // No letters
      expect(() => InputValidation.passwordMustContainLettersAndNumber(invalidPassword1, errorMessage)).toThrowError(errorMessage)
      expect(() => InputValidation.passwordMustContainLettersAndNumber(invalidPassword2, errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the password contains both letters and numbers", () => {
      const validPassword = "Password1";
      expect(() => InputValidation.passwordMustContainLettersAndNumber(validPassword, errorMessage)).not.toThrowError();
    });
  });

  describe("passwordMustNotContainSpace function", () => {
    const errorMessage = "PASSWORD_MUST_NOT_CONTAIN_SPACES"

    it("should throw an error when the password contains spaces", () => {
      const invalidPassword = "Pass word1";
      expect(() => InputValidation.passwordMustNotContainSpace(invalidPassword, errorMessage)).toThrowError(errorMessage)
    });

    it("should not throw an error when the password does not contain spaces", () => {
      const validPassword = "Password1";
      expect(() => InputValidation.passwordMustNotContainSpace(validPassword, errorMessage)).not.toThrowError();
    });
  });

  describe("emailValidFormat function", () => {
    const errorMessage = "INVALID_EMAIL_FORMAT"

    it("should throw an error when the email format is invalid", () => {
      const invalidEmail = "invalid-email@";
      expect(() => InputValidation.emailValidFormat(invalidEmail, errorMessage)).toThrowError(errorMessage);
    });

    it("should not throw an error when the email format is valid", () => {
      const validEmail = "example@email.com";
      expect(() => InputValidation.emailValidFormat(validEmail, errorMessage)).not.toThrowError();
    });
  })

  describe("phoneNumberValidFormat function", () => {
    const errorMessage = "INVALID_PHONE_NUMBER_FORMAT"

    it("should throw an error when the phone number format is invalid", () => {
      const invalidPhoneNumber = "12345";
      expect(() => InputValidation.phoneNumberValidFormat(invalidPhoneNumber, errorMessage)).toThrowError(errorMessage);
    });

    it("should not throw an error when the phone number format is valid", () => {
      const validPhoneNumber1 = "+6281234567890";
      const validPhoneNumber2 = "081234567890";
      expect(() => InputValidation.phoneNumberValidFormat(validPhoneNumber1, errorMessage)).not.toThrowError();
      expect(() => InputValidation.phoneNumberValidFormat(validPhoneNumber2, errorMessage)).not.toThrowError();
    });
  });
});
