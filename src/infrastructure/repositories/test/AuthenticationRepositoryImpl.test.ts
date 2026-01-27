import { describe, expect, it, vi } from "vitest"
import AuthenticationRepositoryImpl from "../AuthenticationRepositoryImpl";
import UserLogin from "../../../domain/users/entity/UserLogin";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import { publicApi } from "../../http/axiosInstance";
import RequestResetPasswordLink from "../../../domain/authentications/entity/RequestResetPasswordLink";
import RequestedResetPasswordLink from "../../../domain/authentications/entity/RequestedResetPasswordLink";
import ResendPasswordResetToken from "../../../domain/authentications/entity/ResendPasswordResetToken";
import RequestedNewPasswordResetToken from "../../../domain/authentications/entity/RequestedNewPasswordResetToken";
import UpdatePassword from "../../../domain/authentications/entity/UpdatePassword";
import UpdatedPassword from "../../../domain/authentications/entity/UpdatedPassword";

vi.mock('../../http/axiosInstance', () => ({
  publicApi: {
    post: vi.fn(),
  },
}));

describe("AuthenticationRepositoryImpl", () => {
  const authenticationRepositoryImpl = new AuthenticationRepositoryImpl();

  describe("loginAccount function", () => {
    it("should login account and return authentication data", async () => {
      const userLogin: UserLogin = new UserLogin(
        'user',
        'password123',
        'valid-captcha-token'
      )

      const mockNewAuth: NewAuth = new NewAuth(
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
      const requestResetPasswordLink: RequestResetPasswordLink = new RequestResetPasswordLink(
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

  describe("resendPasswordResetToken function", () => {
    it("should resend password reset token and return message correctly", async () => {
      const resendPasswordResetToken: ResendPasswordResetToken = new ResendPasswordResetToken('valid-token')

      const mockRequestedNewPasswordResetToken: RequestedNewPasswordResetToken = new RequestedNewPasswordResetToken('If the email is registered, we will send password reset instructions');
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockRequestedNewPasswordResetToken })

      const response: RequestedNewPasswordResetToken = await authenticationRepositoryImpl.resendPasswordResetToken(resendPasswordResetToken)

      expect(publicApi.post).toHaveBeenCalledWith("/authentications/resend-password-reset-token", resendPasswordResetToken)
      expect(response).toBeInstanceOf(RequestedNewPasswordResetToken)
      expect(response).toStrictEqual(mockRequestedNewPasswordResetToken)
    })
  })

  describe("updatePassword function", () => {
    it("should update password and return message correctly", async () => {
      const updatePassword: UpdatePassword = new UpdatePassword('newPassword123', 'valid-token')

      const mockUpdatedPassword: UpdatedPassword = new UpdatedPassword('Your password was updated successfully. You can now sign in with your new password.');
      vi.mocked(publicApi.post).mockResolvedValue({ data: mockUpdatedPassword })

      const response: UpdatedPassword = await authenticationRepositoryImpl.updatePassword(updatePassword)

      expect(publicApi.post).toHaveBeenCalledWith("/authentications/update-password", updatePassword)
      expect(response).toBeInstanceOf(UpdatedPassword)
      expect(response).toStrictEqual(mockUpdatedPassword)
    })
  })
})
