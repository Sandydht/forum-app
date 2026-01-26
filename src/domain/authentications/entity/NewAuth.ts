import InputValidation from "../../utils/InputValidation";

class NewAuth {
  private readonly accessToken: string
  private readonly refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    this.verifyPayload(accessToken, refreshToken)

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  private verifyPayload(accessToken: string, refreshToken: string) {
    const notContainNeededPropertyErrorMessage = "NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY";

    InputValidation.requireNotBlank(accessToken, notContainNeededPropertyErrorMessage);
    InputValidation.requireNotBlank(refreshToken, notContainNeededPropertyErrorMessage);
  }

  getAccessToken(): string {
    return this.accessToken
  }

  getRefreshToken(): string {
    return this.refreshToken
  }
}

export default NewAuth
