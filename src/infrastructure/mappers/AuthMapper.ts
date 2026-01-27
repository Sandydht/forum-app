import NewAuth from "../../domain/authentications/entity/NewAuth";
import RequestedResetPasswordLink from "../../domain/authentications/entity/RequestedResetPasswordLink";
import RequestResetPasswordLink from "../../domain/authentications/entity/RequestResetPasswordLink";
import type { RequestResetPasswordLinkRequestDto } from "../dto/request/RequestResetPasswordLinkRequestDto";
import type { RequestResetPasswordLinkResponseDto } from "../dto/response/RequestResetPasswordLinkResponseDto";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";

class AuthMapper {
  public static toNewAuthDomain(dto: UserLoginResponseDto): NewAuth {
    return new NewAuth(dto.accessToken, dto.refreshToken)
  }

  public static toUserLoginResponseDto(newAuth: NewAuth): UserLoginResponseDto {
    return {
      accessToken: newAuth.getAccessToken(),
      refreshToken: newAuth.getRefreshToken()
    }
  }

  public static toRequestResetPasswordLinkRequestDto(requestResetPasswordLink: RequestResetPasswordLink): RequestResetPasswordLinkRequestDto {
    return {
      email: requestResetPasswordLink.getEmail(),
      captchaToken: requestResetPasswordLink.getCaptchaToken()
    }
  }

  public static toRequestedResetPasswordLinkDomain(dto: RequestResetPasswordLinkResponseDto): RequestedResetPasswordLink {
    return new RequestedResetPasswordLink(dto.message)
  }

  public static toRequestResetPasswordLinkResponseDto(requestedResetPasswordLink: RequestedResetPasswordLink): RequestResetPasswordLinkResponseDto {
    return {
      message: requestedResetPasswordLink.getMessage()
    }
  }

  public static toRequestResetPasswordLinkDomain(dto: RequestResetPasswordLinkRequestDto): RequestResetPasswordLink {
    return new RequestResetPasswordLink(dto.email, dto.captchaToken)
  }
}

export default AuthMapper
