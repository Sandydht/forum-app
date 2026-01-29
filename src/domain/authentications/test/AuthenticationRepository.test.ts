import { describe, expect, it, vi } from "vitest"
import AuthenticationRepository from "../AuthenticationRepository";
import UserLogin from "../../users/entity/UserLogin";
import RequestResetPasswordLink from "../entity/RequestResetPasswordLink";
import MethodAssertion from "../../../application/utils/MethodAssertion";
import ResendPasswordResetToken from "../entity/ResendPasswordResetToken";
import UpdatePassword from "../entity/UpdatePassword";
import ValidatePasswordResetToken from "../entity/ValidatePasswordResetToken";

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const authenticationRepository = new AuthenticationRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn()
    }

    mockMethodAssertion.assertImplemented(authenticationRepository, 'loginAccount', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    mockMethodAssertion.assertImplemented(authenticationRepository, 'requestResetPasswordLink', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    mockMethodAssertion.assertImplemented(authenticationRepository, 'resendPasswordResetToken', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    mockMethodAssertion.assertImplemented(authenticationRepository, 'updatePassword', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    mockMethodAssertion.assertImplemented(authenticationRepository, 'validatePasswordResetToken', 'AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')

    expect(authenticationRepository).toBeInstanceOf(AuthenticationRepository);
    await expect(authenticationRepository.loginAccount(new UserLogin("user", "password123", "valid-captcha-token"))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.requestResetPasswordLink(new RequestResetPasswordLink('example@email.com', '192.168.1.1'))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.resendPasswordResetToken(new ResendPasswordResetToken('valid-token'))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.updatePassword(new UpdatePassword("newPassword123", "valid-token"))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.validatePasswordResetToken(new ValidatePasswordResetToken("valid-token"))).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});