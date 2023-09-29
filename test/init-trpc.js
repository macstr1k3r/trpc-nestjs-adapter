"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const request_scoped_service_1 = require("./request-scoped.service");
const createContext = () => ({
    someValueOnContext: 'randomValue',
});
const trpc = server_1.initTRPC.context().create({});
const { router } = trpc;
const publicProcedure = trpc.procedure;
exports.appRouter = router({
    something: publicProcedure.query(async ({ ctx }) => {
        const requestScopedService = await ctx.resolveNestDependency(request_scoped_service_1.RequestScopedService);
        return requestScopedService.doesSomething();
    }),
});
//# sourceMappingURL=init-trpc.js.map