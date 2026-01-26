import NewAuth from "../../domain/authentications/entity/NewAuth";
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
}

export default AuthMapper
