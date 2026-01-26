import { describe, expect, it, vi } from "vitest"
import AuthenticationRepositoryImpl from "../AuthenticationRepositoryImpl";
import UserLogin from "../../../domain/users/entity/UserLogin";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import { publicApi } from "../../http/axiosInstance";

vi.mock('../../http/axiosInstance', () => ({
  publicApi: {
    post: vi.fn(),
  },
}));

describe("AuthenticationRepositoryImpl", () => {
  const authenticationRepositoryImpl = new AuthenticationRepositoryImpl();

  describe("loginAccount function", () => {
    it("should login account and return authentication data", async () => {
      const userLogin = new UserLogin(
        'user',
        'password123',
        'valid-captcha-token'
      )

      const mockNewAuth = new NewAuth(
        'access-token',
        'refresh-token'
      )
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockNewAuth })

      const response: NewAuth = await authenticationRepositoryImpl.loginAccount(userLogin)

      expect(publicApi.post).toHaveBeenCalledWith("/authentications/login-account", userLogin)
      expect(response).toStrictEqual(mockNewAuth)
    })
  })
})
