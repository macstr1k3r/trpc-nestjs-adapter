/* eslint-disable max-len */
interface Type<T = any> extends Function {
  new(...args: any[]): T;
}

export interface NestResolver<TReq = any, TRes = any> {
  /**
   * Resolves any NestJS dependency from your project. a proxy to `moduleRef.get()`
   *
   * Return type of this function is automatically inferred.
   *
   * Returns a promise which resolves to the dependency.
   */
  resolveNestDependency: <TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol) => Promise<TResult>;

  /**
   *
   *  Include request and response objects
   *
   */
  req: TReq,
  res: TRes,
}
