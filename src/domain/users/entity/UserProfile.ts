import InputValidation from "../../utils/InputValidation"

class UserProfile {
  private readonly id: string
  private readonly username: string
  private readonly fullname: string

  constructor(id: string, username: string, fullname: string) {
    this.verifyPayload(id, username, fullname)

    this.id = id
    this.username = username
    this.fullname = fullname
  }

  private verifyPayload(id: string, username: string, fullname: string) {
    const notContainNeededPropertyErrorMessage = "USER_PROFILE.NOT_CONTAIN_NEEDED_PROPERTY";
    const containRestrictedCharacterErrorMessage = "USER_PROFILE.USERNAME_CONTAIN_RESTRICTED_CHARACTER";
    const limitCharErrorMessage = "USER_PROFILE.USERNAME_LIMIT_CHAR";

    InputValidation.requireNotBlank(id, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(username, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(fullname, notContainNeededPropertyErrorMessage);

    InputValidation.usernameNotContainRestrictedCharacter(username, containRestrictedCharacterErrorMessage);
    InputValidation.usernameLimitCharacter(username, limitCharErrorMessage);
  }

  public getId(): string {
    return this.id
  }

  public getUsername(): string {
    return this.username
  }

  public getFullname(): string {
    return this.fullname
  }
}

export default UserProfile
