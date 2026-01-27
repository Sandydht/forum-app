import { describe, it, expect, vi } from "vitest";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository";
import LoginAccountUseCase from "../LoginAccountUseCase";
import UserLogin from "../../../domain/users/entity/UserLogin";
import type SecureStorage from "../../utils/SecuredStorage";
import type MethodAssertion from "../../utils/MethodAssertion";

describe("LoginAccountUseCase", () => {
  it('should orchestrate the register account action correctly', async () => {
    const userLogin: UserLogin = new UserLogin(
      'user',
      'password123',
      'valid-captcha-token'
    )

    const mockNewAuth: NewAuth = new NewAuth(
      'access-token',
      'refresh-token'
    )

    const mockAuthenticationRepository: AuthenticationRepository = {
      loginAccount: vi.fn().mockResolvedValue(mockNewAuth)
    }

    const mockSecureStorage: SecureStorage = {
      setSecureItem: vi.fn()
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const loginAccountUseCase: LoginAccountUseCase = new LoginAccountUseCase(
      mockAuthenticationRepository,
      mockSecureStorage,
      mockMethodAssertion
    )

    const result: NewAuth = await loginAccountUseCase.execute(userLogin)

    expect(mockAuthenticationRepository.loginAccount).toHaveBeenCalledWith(userLogin)
    expect(mockSecureStorage.setSecureItem).toHaveBeenCalledWith("accessToken", mockNewAuth.getAccessToken())
    expect(mockSecureStorage.setSecureItem).toHaveBeenCalledWith("refreshToken", mockNewAuth.getRefreshToken())
    expect(result).toStrictEqual(mockNewAuth)
  })
});