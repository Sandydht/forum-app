import type { AxiosResponse } from "axios";
import AuthenticationRepository from "../../domain/authentications/AuthenticationRepository";
import NewAuth from "../../domain/authentications/entity/NewAuth";
import UserLogin from "../../domain/users/entity/UserLogin";
import { publicApi } from "../http/axiosInstance";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import AuthMapper from "../mappers/AuthMapper";
import UserMapper from "../mappers/UserMapper";
import type { RequestResetPasswordLinkRequestDto } from "../dto/request/RequestResetPasswordLinkRequestDto";
import type RequestResetPasswordLink from "../../domain/authentications/entity/RequestResetPasswordLink";
import type { RequestResetPasswordLinkResponseDto } from "../dto/response/RequestResetPasswordLinkResponseDto";
import type RequestedResetPasswordLink from "../../domain/authentications/entity/RequestedResetPasswordLink";
import type ResendPasswordResetToken from "../../domain/authentications/entity/ResendPasswordResetToken";
import type RequestedNewPasswordResetToken from "../../domain/authentications/entity/RequestedNewPasswordResetToken";
import type { ResendPasswordResetTokenRequestDto } from "../dto/request/ResendPasswordResetTokenRequestDto";
import type { RequestedNewPasswordResetTokenResponseDto } from "../dto/response/RequestedNewPasswordResetTokenResponseDto";
import type UpdatePassword from "../../domain/authentications/entity/UpdatePassword";
import type UpdatedPassword from "../../domain/authentications/entity/UpdatedPassword";
import type { UpdatedPasswordResponseDto } from "../dto/response/UpdatedPasswordResponseDto";
import type { UpdatePasswordRequestDto } from "../dto/request/UpdatePasswordRequestDto";
import type { ValidatePasswordResetTokenRequest } from "../dto/request/ValidatePasswordResetTokenRequestDto";
import type ValidatePasswordResetToken from "../../domain/authentications/entity/ValidatePasswordResetToken";

class AuthenticationRepositoryImpl extends AuthenticationRepository {
  public async loginAccount(payload: UserLogin): Promise<NewAuth> {
    const { data } = await publicApi.post<
      UserLoginResponseDto,
      AxiosResponse<UserLoginResponseDto>,
      UserLoginRequestDto
    >('/authentications/login-account', UserMapper.toUserLoginRequestDto(payload));

    return AuthMapper.toNewAuthDomain(data)
  }

  public async requestResetPasswordLink(payload: RequestResetPasswordLink): Promise<RequestedResetPasswordLink> {
    const { data } = await publicApi.post<
      RequestResetPasswordLinkResponseDto,
      AxiosResponse<RequestResetPasswordLinkResponseDto>,
      RequestResetPasswordLinkRequestDto
    >('/authentications/request-reset-password-link', AuthMapper.toRequestResetPasswordLinkRequestDto(payload));
    
    return AuthMapper.toRequestedResetPasswordLinkDomain(data)
  }

  public async resendPasswordResetToken(payload: ResendPasswordResetToken): Promise<RequestedNewPasswordResetToken> {
    const { data } = await publicApi.post<
      RequestedNewPasswordResetTokenResponseDto,
      AxiosResponse<RequestedNewPasswordResetTokenResponseDto>,
      ResendPasswordResetTokenRequestDto
    >('/authentications/resend-password-reset-token', AuthMapper.toResendPasswordResetTokenRequestDto(payload));
    
    return AuthMapper.toRequestedNewPasswordResetTokenDomain(data)
  }

  public async updatePassword(payload: UpdatePassword): Promise<UpdatedPassword> {
    const { data } = await publicApi.post<
      UpdatedPasswordResponseDto,
      AxiosResponse<UpdatedPasswordResponseDto>,
      UpdatePasswordRequestDto
    >('/authentications/update-password', AuthMapper.toUpdatePasswordRequestDto(payload));
    
    return AuthMapper.toUpdatedPasswordDomain(data)
  }

  public async validatePasswordResetToken(payload: ValidatePasswordResetToken): Promise<void> {
    await publicApi.post<
      unknown,
      AxiosResponse<unknown>,
      ValidatePasswordResetTokenRequest
    >('/authentications/validate-password-reset-token', AuthMapper.toValidatePasswordResetTokenRequestDto(payload));
  }
}

export default AuthenticationRepositoryImpl
