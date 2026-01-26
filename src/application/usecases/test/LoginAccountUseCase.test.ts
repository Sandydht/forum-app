import { describe, it, expect, vi } from "vitest";
import NewAuth from "../../../domain/authentications/entity/NewAuth";
import type AuthenticationRepository from "../../../domain/authentications/AuthenticationRepository";
import LoginAccountUseCase from "../LoginAccountUseCase";
import UserLogin from "../../../domain/users/entity/UserLogin";

describe("LoginAccountUseCase", () => {
  it('should orchestrate the register account action correctly', async () => {
   const userLogin = new UserLogin(
    'user',
    'password123',
    'valid-captcha-token'
   )

    const mockResponse = new NewAuth(
      'access-token',
      'refresh-token',
    )
    const mockAuthenticationRepository: AuthenticationRepository = {
      loginAccount: vi.fn().mockResolvedValue(mockResponse),
    }

    const loginAccountUseCase = new LoginAccountUseCase(mockAuthenticationRepository)

    const result: NewAuth = await loginAccountUseCase.execute(userLogin)

    expect(mockAuthenticationRepository.loginAccount).toHaveBeenCalledWith(userLogin)
    expect(result).toStrictEqual(mockResponse)
  })
});