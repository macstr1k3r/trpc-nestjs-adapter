/* eslint-disable import/no-extraneous-dependencies */
import { initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InferContextType } from '../lib/infer-context-type.type';
import { AService } from './domain-b/a.service';

// You can use any variable name you like.
// We use t to keep things simple.

export const createContext = ({ req }: CreateFastifyContextOptions) => {
  const { hostname } = req;

  return {
    hostname,
    someValueOnContext: 'randomValue',
  };
};

type CtxType = InferContextType<typeof createContext, FastifyRequest, FastifyReply>;

const trpc = initTRPC.context<CtxType>().create({

});

const { router } = trpc;
const publicProcedure = trpc.procedure;

export const appRouter = router({
  something: publicProcedure.query(async ({ ctx }) => {
    const service = await ctx.resolveNestDependency(AService);
    return service.smth();
  }),
});
