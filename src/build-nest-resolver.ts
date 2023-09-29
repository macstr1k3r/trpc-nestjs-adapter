/* eslint-disable no-underscore-dangle */
import { ContextIdFactory, ModuleRef } from "@nestjs/core";

export function buildNestResolver(req: any, moduleRef: ModuleRef) {
    // Retrieve the contextId specific to this request
    let contextId = ContextIdFactory.getByRequest(req);

    // Effectively a provider for the `REQUEST` token
    moduleRef.registerRequestByContextId(req, contextId);

    const resolveNestDependency: ModuleRef["resolve"] = (typeOrToken) => {
        return moduleRef.resolve(typeOrToken, contextId, { strict: false });
    };

    // API Candidates
    // const requestScopedService = await ctx.nestResolver.resolve(RequestScopedService);
    // const requestScopedService = await ctx.nestResolver(RequestScopedService);
    // const requestScopedService = await ctx.nestResolve(RequestScopedService);
    // const requestScopedService = await ctx.resolveNestDependency(RequestScopedService);
    // const requestScopedService = await ctx.resolveNest(RequestScopedService);
    // const requestScopedService = await ctx.resolve(RequestScopedService);

    return {
        resolveNestDependency,
        /**
         *
         * "resets" the DI subtree from which dependencies will be resolved.
         *
         * All subsequent calls to `resolveNestDependency` will resolve dependencies from the new subtree
         * `REQUEST` scoped dependencies will be re-created.
         */
        resetDiSubtree: () => {
            contextId = ContextIdFactory.create();
            moduleRef.registerRequestByContextId(req, contextId);
        },
        attachToReqObject: (_trpc_nest_adapter_meta: Record<string, any>) => {
            req._trpc_nest_adapter_meta = _trpc_nest_adapter_meta;
        },
    };
}
