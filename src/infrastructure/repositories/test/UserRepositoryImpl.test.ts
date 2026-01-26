import { describe, it, expect, vi } from "vitest"
import UserRepositoryImpl from "../UserRepositoryImpl";
import RegisterUser from "../../../domain/users/entity/RegisterUser";
import RegisteredUser from "../../../domain/users/entity/RegisteredUser";
import { publicApi } from "../../http/axiosInstance";
import type RegisterUserRequestDto from "../../dto/request/RegisterUserRequestDto";
import type RegisterUserResponseDto from "../../dto/response/RegisterUserResponseDto";

vi.mock('../../http/axiosInstance', () => ({
  publicApi: {
    post: vi.fn(),
  },
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
      expect(response.getId()).toStrictEqual('user-123');
      expect(response.getUsername()).toStrictEqual(request.getUsername());
      expect(response.getEmail()).toStrictEqual(request.getEmail());
      expect(response.getPhoneNumber()).toStrictEqual(request.getPhoneNumber());
      expect(response.getFullname()).toStrictEqual(request.getFullname());
    })
  })
})