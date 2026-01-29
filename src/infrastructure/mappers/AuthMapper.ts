import NewAuth from "../../domain/authentications/entity/NewAuth";
import RequestedNewPasswordResetToken from "../../domain/authentications/entity/RequestedNewPasswordResetToken";
import RequestedResetPasswordLink from "../../domain/authentications/entity/RequestedResetPasswordLink";
import RequestResetPasswordLink from "../../domain/authentications/entity/RequestResetPasswordLink";
import ResendPasswordResetToken from "../../domain/authentications/entity/ResendPasswordResetToken";
import UpdatedPassword from "../../domain/authentications/entity/UpdatedPassword";
import UpdatePassword from "../../domain/authentications/entity/UpdatePassword";
import type { RequestResetPasswordLinkRequestDto } from "../dto/request/RequestResetPasswordLinkRequestDto";
import type { ResendPasswordResetTokenRequestDto } from "../dto/request/ResendPasswordResetTokenRequestDto";
import type { UpdatePasswordRequestDto } from "../dto/request/UpdatePasswordRequestDto";
import type { RequestedNewPasswordResetTokenResponseDto } from "../dto/response/RequestedNewPasswordResetTokenResponseDto";
import type { RequestResetPasswordLinkResponseDto } from "../dto/response/RequestResetPasswordLinkResponseDto";
import type { UpdatedPasswordResponseDto } from "../dto/response/UpdatedPasswordResponseDto";
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

  public static toResendPasswordResetTokenDomain(dto: ResendPasswordResetTokenRequestDto): ResendPasswordResetToken {
    return new ResendPasswordResetToken(dto.token)
  }

  public static toRequestedNewPasswordResetTokenResponseDto(domain: RequestedNewPasswordResetToken): RequestedNewPasswordResetTokenResponseDto {
    return {
      message: domain.getMessage()
    }
  }

  public static toRequestedNewPasswordResetTokenDomain(dto: RequestedNewPasswordResetTokenResponseDto): RequestedNewPasswordResetToken {
    return new RequestedNewPasswordResetToken(dto.message)
  }

  public static toResendPasswordResetTokenRequestDto(domain: ResendPasswordResetToken): ResendPasswordResetTokenRequestDto {
    return {
      token: domain.getToken()
    }
  }

  public static toUpdatePasswordRequestDto(domain: UpdatePassword): UpdatePasswordRequestDto {
    return {
      newPassword: domain.getNewPassword(),
      token: domain.getToken()
    }
  }

  public static toUpdatedPasswordDomain(dto: UpdatedPasswordResponseDto): UpdatedPassword {
    return new UpdatedPassword(dto.message)
  }

  public static toUpdatedPasswordResponseDto(domain: UpdatedPassword): UpdatedPasswordResponseDto {
    return {
      message: domain.getMessage()
    }
  }

  public static toUpdatePasswordDomain(dto: UpdatePasswordRequestDto): UpdatePassword {
    return new UpdatePassword(dto.newPassword, dto.token)
  }
}

export default AuthMapper
