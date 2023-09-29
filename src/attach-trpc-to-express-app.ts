import { NestExpressApplication } from '@nestjs/platform-express';
import { TrpcModuleOptions } from './trpc-module-options.type';

import { buildTrpcNestMiddleware, BuildTrpcNestMiddlewareOptions } from './build-trpc-nest-middleware';

interface Options extends TrpcModuleOptions, BuildTrpcNestMiddlewareOptions {
  expressApp: NestExpressApplication,
}

/**
 * Attaches a TRPC router to your nestExpressApp
 * @param options: Options
 */
export function attachTrpcToExpressApp({
  router, moduleRef, createContext, path, expressApp,
}: Options): void {
  const trpcNestMiddleware = buildTrpcNestMiddleware({
    router,
    moduleRef,
    createContext,
  });

  expressApp.use(path, trpcNestMiddleware);
}
