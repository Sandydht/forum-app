import { describe, expect, it } from "vitest"
import AuthenticationRepository from "../AuthenticationRepository";
import UserLogin from "../../users/entity/UserLogin";

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const authenticationRepository = new AuthenticationRepository();

    expect(authenticationRepository).toBeInstanceOf(AuthenticationRepository);
    await expect(authenticationRepository.loginAccount(new UserLogin("user", "password123", "valid-captcha-token"))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});