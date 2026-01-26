import type { AxiosResponse } from "axios";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import AuthenticationRepository from "../../domain/authentications/AuthenticationRepository";
import NewAuth from "../../domain/authentications/entity/NewAuth";
import type UserLogin from "../../domain/users/entity/UserLogin";
import { publicApi } from "../http/axiosInstance";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import UserMapper from "../mappers/UserMapper";
import AuthMapper from "../mappers/AuthMapper";

class AuthenticationRepositoryImpl extends AuthenticationRepository {
  public async loginAccount(payload: UserLogin): Promise<NewAuth> {
    const { data } = await publicApi.post<UserLoginResponseDto, AxiosResponse<UserLoginResponseDto>, UserLoginRequestDto>('/authentications/login-account', UserMapper.toUserLoginRequestDto(payload));
    return AuthMapper.toNewAuthDomain(data);
  }
}

export default AuthenticationRepositoryImpl
