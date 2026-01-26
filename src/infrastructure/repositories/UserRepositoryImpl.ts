import type RegisterUserResponseDto from "../dto/response/RegisterUserResponseDto";
import RegisteredUser from "../../domain/users/entity/RegisteredUser";
import type RegisterUser from "../../domain/users/entity/RegisterUser";
import UserRepository from "../../domain/users/UserRepository";
import { publicApi } from "../http/axiosInstance";
import UserMapper from "../mappers/UserMapper";
import type { AxiosResponse } from "axios";
import type RegisterUserRequestDto from "../dto/request/RegisterUserRequestDto";

class UserRepositoryImpl extends UserRepository {
  public async registerUser(payload: RegisterUser): Promise<RegisteredUser> {
    const { data } = await publicApi.post<RegisterUserResponseDto, AxiosResponse<RegisterUserResponseDto>, RegisterUserRequestDto>('/users/register-account', UserMapper.toRegisterUserRequestDto(payload));
    return UserMapper.toRegisteredUserDomain(data)
  }
}

export default UserRepositoryImpl;
