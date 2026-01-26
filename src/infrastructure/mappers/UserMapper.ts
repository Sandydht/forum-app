import RegisteredUser from "../../domain/users/entity/RegisteredUser";
import RegisterUser from "../../domain/users/entity/RegisterUser";
import UserLogin from "../../domain/users/entity/UserLogin";
import UserProfile from "../../domain/users/entity/UserProfile";
import type RegisterUserRequestDto from "../dto/request/RegisterUserRequestDto";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type RegisterUserResponseDto from "../dto/response/RegisterUserResponseDto";
import type { UserProfileResponseDto } from "../dto/response/UserProfileResponseDto";

class UserMapper {
  public static toUserLoginDomain(dto: UserLoginRequestDto): UserLogin {
    return new UserLogin(dto.username, dto.password, dto.captchaToken);
  }

  public static toUserLoginRequestDto(userLogin: UserLogin): UserLoginRequestDto {
    return {
      username: userLogin.getUsername(),
      password: userLogin.getPassword(),
      captchaToken: userLogin.getCaptchaToken()
    }
  }

  public static toRegisterUserDomain(dto: RegisterUserRequestDto): RegisterUser {
    return new RegisterUser(dto.username, dto.email, dto.phoneNumber, dto.fullname, dto.password, dto.captchaToken)
  }

  public static toRegisterUserRequestDto(registerUser: RegisterUser): RegisterUserRequestDto {
    return {
      username: registerUser.getUsername(),
      email: registerUser.getEmail(),
      phoneNumber: registerUser.getPhoneNumber(),
      fullname: registerUser.getFullname(),
      password: registerUser.getPassword(),
      captchaToken: registerUser.getCaptchaToken()
    }
  }

  public static toRegisteredUserDomain(dto: RegisterUserResponseDto): RegisteredUser {
    return new RegisteredUser(dto.id, dto.username, dto.email, dto.phoneNumber, dto.fullname)
  }

  public static toRegisterUserResponseDto(registeredUser: RegisteredUser): RegisterUserResponseDto {
    return {
      id: registeredUser.getId(),
      username: registeredUser.getUsername(),
      email: registeredUser.getEmail(),
      phoneNumber: registeredUser.getPhoneNumber(),
      fullname: registeredUser.getFullname()
    }
  }

  public static toUserProfileDomain(dto: UserProfileResponseDto): UserProfile {
    return new UserProfile(
      dto.id,
      dto.username,
      dto.fullname
    )
  }

  public static toUserProfileResponseDto(userProfile: UserProfile): UserProfileResponseDto {
    return {
      id: userProfile.getId(),
      username: userProfile.getUsername(),
      fullname: userProfile.getFullname()
    }
  }
}

export default UserMapper
