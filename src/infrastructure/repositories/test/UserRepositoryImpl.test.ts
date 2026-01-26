import { describe, it, expect, vi } from "vitest"
import UserRepositoryImpl from "../UserRepositoryImpl";
import RegisterUser from "../../../domain/users/entity/RegisterUser";
import RegisteredUser from "../../../domain/users/entity/RegisteredUser";
import { privateApi, publicApi } from "../../http/axiosInstance";
import type RegisterUserRequestDto from "../../dto/request/RegisterUserRequestDto";
import type RegisterUserResponseDto from "../../dto/response/RegisterUserResponseDto";
import type { UserProfileResponseDto } from "../../dto/response/UserProfileResponseDto";
import UserProfile from "../../../domain/users/entity/UserProfile";

vi.mock('../../http/axiosInstance', () => ({
  publicApi: {
    post: vi.fn()
  },
  privateApi: {
    get: vi.fn()
  }
}));

describe("UserRepositoryImpl", () => {
  const userRepositoryImpl = new UserRepositoryImpl();

  describe("registerUser function", () => {
    const validPayload: RegisterUserRequestDto = {
      username: 'user',
      email: 'example@email.com',
      phoneNumber: '081234567890',
      fullname: 'Fullname',
      password: 'password123',
      captchaToken: 'valid-captcha-token'
    }

    it("should register a user and return the registered user data", async () => {
      const request = new RegisterUser(
        validPayload.username,
        validPayload.email,
        validPayload.phoneNumber,
        validPayload.fullname,
        validPayload.password,
        validPayload.captchaToken,
      );

      const mockResponse: RegisterUserResponseDto = {
        id: 'user-123',
        username: validPayload.username,
        email: validPayload.email,
        phoneNumber: validPayload.phoneNumber,
        fullname: validPayload.fullname,
      }
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockResponse });

      const response: RegisteredUser = await userRepositoryImpl.registerUser(request);

      expect(publicApi.post).toHaveBeenCalledWith("/users/register-account", request);
      expect(response).toBeInstanceOf(RegisteredUser);
      expect(response).toEqual(mockResponse);
    })
  })

  describe("getUserProfile function", () => {
    it("should return UserProfile data correctly", async () => {
      const mockUserProfileResponse: UserProfileResponseDto = {
        id: 'user-123',
        username: 'user',
        fullname: 'Fullname'
      }
      vi.mocked(privateApi.get).mockResolvedValue({ data: mockUserProfileResponse })

      const response: UserProfile = await userRepositoryImpl.getUserProfile();

      expect(privateApi.get).toHaveBeenCalledWith("/users/get-profile");
      expect(response).toBeInstanceOf(UserProfile);
      expect(response).toEqual(mockUserProfileResponse);
    })
  })
})