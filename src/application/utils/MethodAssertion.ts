/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
class MethodAssertion {
  public assertImplemented<
    T extends object, 
    K extends keyof T
  >(
    target: T,
    _methodName: K,
    _errorCode: string
  ): asserts target is T & Record<K, Function> {
    throw new Error('METHOD_ASSERTION.METHOD_NOT_IMPLEMENTED')
    // if (typeof target[methodName] !== "function") {
    //   throw new Error(errorCode);
    // }
  }
}

export default MethodAssertion
