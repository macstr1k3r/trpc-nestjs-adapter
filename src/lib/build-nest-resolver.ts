import { ContextIdFactory, ModuleRef } from '@nestjs/core';

export function buildNestResolver(req: any, moduleRef: ModuleRef) {
  // Retrieve the contextId specific to this request
  const contextId = ContextIdFactory.getByRequest(req);

  // Effectively a provider for the `REQUEST` token
  moduleRef.registerRequestByContextId(req, contextId);

  const resolve: ModuleRef['resolve'] = (typeOrToken) => moduleRef.resolve(
    typeOrToken,
    contextId,
    { strict: false },
  );

  // API Candidates
  // const requestScopedService = await ctx.nestResolver.resolve(RequestScopedService);
  // const requestScopedService = await ctx.nestResolver(RequestScopedService);
  // const requestScopedService = await ctx.nestResolve(RequestScopedService);
  // const requestScopedService = await ctx.resolveNestDependency(RequestScopedService);
  // const requestScopedService = await ctx.resolveNest(RequestScopedService);
  // const requestScopedService = await ctx.resolve(RequestScopedService);
  return {
    resolveNestDependency: resolve,
  };
}
