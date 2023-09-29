"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const a_service_1 = require("./domain-b/a.service");
const createContext = () => ({
    someValueOnContext: 'randomValue',
});
const trpc = server_1.initTRPC.context().create({});
const { router } = trpc;
const publicProcedure = trpc.procedure;
exports.appRouter = router({
    something: publicProcedure.query(async ({ ctx }) => {
        const service = await ctx.resolveNestDependency(a_service_1.AService);
        console.log({ service });
        return service.smth();
    }),
});
//# sourceMappingURL=init-trpc.js.map