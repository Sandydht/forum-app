import { describe, expect, it } from "vitest"
import SecureStorage from "../SecuredStorage";

describe('SecureStorage interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const secureStorage = new SecureStorage();

    expect(secureStorage).toBeInstanceOf(SecureStorage);
    expect(() => secureStorage.setSecureItem("", "")).toThrowError('SECURE_STORAGE.METHOD_NOT_IMPLEMENTED');
    expect(() => secureStorage.getSecureItem("")).toThrowError('SECURE_STORAGE.METHOD_NOT_IMPLEMENTED');
    expect(() => secureStorage.removeSecureItem("")).toThrowError('SECURE_STORAGE.METHOD_NOT_IMPLEMENTED');
  });
});