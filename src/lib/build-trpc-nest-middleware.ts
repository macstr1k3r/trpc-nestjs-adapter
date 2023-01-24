import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { ModuleRef } from '@nestjs/core';
import { AnyRouter } from '@trpc/server';
import { buildNestResolver } from './build-nest-resolver';

export interface BuildTrpcNestMiddlewareOptions {
  /** Your TRPC Router */
  router: AnyRouter;

  /** The NestJS ModuleRef */
  moduleRef: ModuleRef;

  /** A function that returns the context object as used with TRPC */
  createContext: () => any;
}

/**
 * Builds an Express middleware that handles all trpc requests.
 *
 * The middleware will adds a `resolve` property to the context
 *
 * `resolve` is a function that can be used to resolve NestJS providers
 *
 * @param req Express request object
 * @param moduleRef The moduleRef from the NestJS app
 * @param createContext A function that returns the context object as used with TRPC
 * @returns Express middleware which is capable of handling trpc requests
 */
export function buildTrpcNestMiddleware({ moduleRef, router, createContext }: BuildTrpcNestMiddlewareOptions) {
  return function trpcNestMiddleware(req: any, res: any) {
    const { resolveNestDependency } = buildNestResolver(req, moduleRef);

    return createHTTPHandler({
      router,
      createContext: () => {
        const userProvidedContext = createContext();

        return {
          ...userProvidedContext,
          resolveNestDependency,
        };
      },
    })(req, res);
  };
}
