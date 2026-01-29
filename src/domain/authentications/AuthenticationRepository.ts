/* eslint-disable @typescript-eslint/no-unused-vars */
import type UserLogin from "../users/entity/UserLogin";
import type NewAuth from "./entity/NewAuth";
import type RequestedNewPasswordResetToken from "./entity/RequestedNewPasswordResetToken";
import type RequestedResetPasswordLink from "./entity/RequestedResetPasswordLink";
import type RequestResetPasswordLink from "./entity/RequestResetPasswordLink";
import type ResendPasswordResetToken from "./entity/ResendPasswordResetToken";
import type UpdatedPassword from "./entity/UpdatedPassword";
import type UpdatePassword from "./entity/UpdatePassword";
import type ValidatePasswordResetToken from "./entity/ValidatePasswordResetToken";

class AuthenticationRepository {
  public async loginAccount?(_payload: UserLogin): Promise<NewAuth> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  public async requestResetPasswordLink?(_payload: RequestResetPasswordLink): Promise<RequestedResetPasswordLink> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  public async resendPasswordResetToken?(_payload: ResendPasswordResetToken): Promise<RequestedNewPasswordResetToken> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  public async updatePassword?(_payload: UpdatePassword): Promise<UpdatedPassword> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  public async validatePasswordResetToken?(_payload: ValidatePasswordResetToken): Promise<void> {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

export default AuthenticationRepository;
