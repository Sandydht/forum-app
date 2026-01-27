/* eslint-disable @typescript-eslint/no-unused-vars */
class SecureStorage {
  public setSecureItem?(_key: string, _value: unknown) {
    throw new Error("SECURE_STORAGE.METHOD_NOT_IMPLEMENTED");
  }

  public getSecureItem?(_key: string): unknown {
    throw new Error("SECURE_STORAGE.METHOD_NOT_IMPLEMENTED");
  }

  public removeSecureItem?(_key: string) {
    throw new Error("SECURE_STORAGE.METHOD_NOT_IMPLEMENTED");
  }
}

export default SecureStorage
