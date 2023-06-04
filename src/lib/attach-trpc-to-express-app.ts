import type { NestExpressApplication } from '@nestjs/platform-express';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import type { FastifyInstance } from 'fastify';
import { TrpcModuleOptions } from './trpc-module-options.type';
import {
  buildTrpcNestMiddleware,
  BuildTrpcNestMiddlewareOptions,
  extendTrpcContext,
} from './build-trpc-nest-middleware';

type ExpressApp = {
  expressApp?: NestExpressApplication,
  fastifyApp?: never,
} & TrpcModuleOptions & BuildTrpcNestMiddlewareOptions;

type FastifyApp = {
  expressApp?: never,
  fastifyApp?: FastifyInstance,
} & TrpcModuleOptions & BuildTrpcNestMiddlewareOptions;

type Options = ExpressApp | FastifyApp;

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

  expressApp?.use(path, trpcNestMiddleware);
}

/**
 * Attaches a TRPC router to your fastifyApp
 * @param options: Options
 */
export function attachTrpcToFastifyApp({
  router, moduleRef, createContext, path, fastifyApp,
}: Options): void {
  fastifyApp?.removeContentTypeParser(['application/json']);

  fastifyApp?.register(fastifyTRPCPlugin, {
    prefix: path,
    trpcOptions: {
      router,
      createContext: extendTrpcContext(createContext, moduleRef),
    },
  });
}
