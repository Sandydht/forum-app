import { describe, expect, it, vi } from "vitest"
import AuthenticationRepositoryImpl from "../AuthenticationRepositoryImpl";
import UserLogin from "../../../domain/users/entity/UserLogin";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import { publicApi } from "../../http/axiosInstance";
import RequestResetPasswordLink from "../../../domain/authentications/entity/RequestResetPasswordLink";
import RequestedResetPasswordLink from "../../../domain/authentications/entity/RequestedResetPasswordLink";

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
      expect(response).toBeInstanceOf(NewAuth)
      expect(response).toStrictEqual(mockNewAuth)
    })
  })

  describe("requestResetPasswordLink function", () => {
    it("should request reset password link and return message correctly", async () => {
      const requestResetPasswordLink = new RequestResetPasswordLink(
        'example@email.com',
        'valid-captcha-token'
      )

      const mockRequestedResetPasswordLink = new RequestedResetPasswordLink('If the email is registered, we will send password reset instructions')
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockRequestedResetPasswordLink })

      const response: RequestedResetPasswordLink = await authenticationRepositoryImpl.requestResetPasswordLink(requestResetPasswordLink)

      expect(publicApi.post).toHaveBeenCalledWith("/authentications/request-reset-password-link", requestResetPasswordLink)
      expect(response).toBeInstanceOf(RequestedResetPasswordLink)
      expect(response).toStrictEqual(mockRequestedResetPasswordLink)
    })
  })
})
