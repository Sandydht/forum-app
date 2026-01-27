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
}

export default AuthenticationRepositoryImpl
