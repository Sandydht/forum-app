import { describe, expect, it, vi } from "vitest"
import { publicApi } from "../../http/axiosInstance";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import AuthenticationRepositoryImpl from "../AuthenticationRepositoryImpl";
import type { UserLoginResponseDto } from "../../dto/response/UserLoginResponseDto";
import type { UserLoginRequestDto } from "../../dto/request/UserLoginRequestDto";
import UserMapper from "../../mappers/UserMapper";

vi.mock('../../http/axiosInstance', () => ({
  publicApi: {
    post: vi.fn(),
  },
}));

describe("AuthenticationRepositoryImpl", () => {
  const authenticationRepositoryImpl = new AuthenticationRepositoryImpl();

  describe("loginAccount function", () => {
    const validPayload: UserLoginRequestDto = {
      username: "user",
      password: "password123",
      captchaToken: "valid-captcha-token"
    }

    it("should login account and return authentication data", async () => {
      const request = UserMapper.toUserLoginDomain(validPayload)

      const mockResponse: UserLoginResponseDto = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      }
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockResponse });

      const response: NewAuth = await authenticationRepositoryImpl.loginAccount(request);

      expect(publicApi.post).toHaveBeenCalledWith("/authentications/login-account", request);
      expect(response).toBeInstanceOf(NewAuth);
      expect(response.getAccessToken()).toStrictEqual(mockResponse.accessToken);
      expect(response.getRefreshToken()).toStrictEqual(mockResponse.refreshToken);
    })
  })
})
