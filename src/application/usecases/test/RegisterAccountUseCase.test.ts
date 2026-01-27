import { describe, it, expect, vi } from "vitest";
import RegisteredUser from "../../../domain/users/entity/RegisteredUser";
import type UserRepository from "../../../domain/users/UserRepository";
import RegisterAccountUseCase from "../RegisterAccountUseCase";
import RegisterUser from "../../../domain/users/entity/RegisterUser";
import type MethodAssertion from "../../utils/MethodAssertion";

describe("RegisterAccountUseCase", () => {
  it('should orchestrate the register account action correctly', async () => {
    const registerUser = new RegisterUser(
      'user',
      'example@email.com',
      '081234567890',
      'Fullname',
      'password123',
      'valid-captcha-token'
    )

    const mockResponse = new RegisteredUser(
      'user-123',
      'user',
      'example@email.com',
      '081234567890',
      'Fullname'
    )
    const mockUserRepository: UserRepository = {
      registerAccount: vi.fn().mockResolvedValue(mockResponse)
    }

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    const registerAccountUseCase: RegisterAccountUseCase = new RegisterAccountUseCase(mockUserRepository, mockMethodAssertion)

    const result = await registerAccountUseCase.execute(registerUser)

    expect(mockUserRepository.registerAccount).toHaveBeenCalledWith(registerUser)
    expect(result).toStrictEqual(mockResponse)
  })
});