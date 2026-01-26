import { describe, expect, it } from "vitest"
import UserRepository from "../UserRepository";
import RegisterUser from "../entity/RegisterUser";

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const userRepository = new UserRepository();

    expect(userRepository).toBeInstanceOf(UserRepository);
    await expect(userRepository.registerAccount(new RegisterUser("user", "example@email.com", "081234567890", "user", "password123", "valid-captcha-token"))).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});