import type RegisterUserResponseDto from "../dto/response/RegisterUserResponseDto";
import RegisteredUser from "../../domain/users/entity/RegisteredUser";
import type RegisterUser from "../../domain/users/entity/RegisterUser";
import UserRepository from "../../domain/users/UserRepository";
import { privateApi, publicApi } from "../http/axiosInstance";
import UserMapper from "../mappers/UserMapper";
import type { AxiosResponse } from "axios";
import type RegisterUserRequestDto from "../dto/request/RegisterUserRequestDto";
import type UserProfile from "../../domain/users/entity/UserProfile";
import type { UserProfileResponseDto } from "../dto/response/UserProfileResponseDto";

class UserRepositoryImpl extends UserRepository {
  public async registerUser(payload: RegisterUser): Promise<RegisteredUser> {
    const { data } = await publicApi.post<RegisterUserResponseDto, AxiosResponse<RegisterUserResponseDto>, RegisterUserRequestDto>('/users/register-account', UserMapper.toRegisterUserRequestDto(payload));
    return UserMapper.toRegisteredUserDomain(data)
  }

  public async getUserProfile(): Promise<UserProfile> {
    const { data } = await privateApi.get<UserProfileResponseDto, AxiosResponse<UserProfileResponseDto>>('/users/get-profile');
    return UserMapper.toUserProfileDomain(data)
  }
}

export default UserRepositoryImpl;
