import { initTRPC } from '@trpc/server';
import { RequestScopedService } from './request-scoped.service';
import { InferContextType } from '../lib/infer-context-type.type';

// You can use any variable name you like.
// We use t to keep things simple.
type CtxType = InferContextType<typeof createContext>;
const createContext = () => ({
  someValueOnContext: 'randomValue',
});
const trpc = initTRPC.context<CtxType>().create({

});

const { router } = trpc;
const publicProcedure = trpc.procedure;

export const appRouter = router({
  something: publicProcedure.query(async ({ ctx }) => {
    const requestScopedService = await ctx.resolveNestDependency(RequestScopedService);

    return requestScopedService.doesSomething();
  }),
});
