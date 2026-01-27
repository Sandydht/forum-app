import { describe, expect, it, vi } from "vitest"
import UserRepository from "../UserRepository";
import RegisterUser from "../entity/RegisterUser";
import type MethodAssertion from "../../../application/utils/MethodAssertion";

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const userRepository = new UserRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    mockMethodAssertion.assertImplemented(userRepository, 'registerAccount', 'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    mockMethodAssertion.assertImplemented(userRepository, 'getUserProfile', 'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')

    expect(userRepository).toBeInstanceOf(UserRepository);
    await expect(userRepository.registerAccount(new RegisterUser("user", "example@email.com", "081234567890", "user", "password123", "valid-captcha-token"))).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getUserProfile()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});