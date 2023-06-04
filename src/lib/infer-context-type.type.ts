import { inferAsyncReturnType } from '@trpc/server';
import { IncomingMessage, ServerResponse } from 'http';
import { NestResolver } from './nest-resolver.type';

export type InferContextType<TContext, TReq = IncomingMessage, TRes = ServerResponse> =
  TContext extends (args?:any) => any
    ? inferAsyncReturnType<TContext> & NestResolver<TReq, TRes>
    : NestResolver<TReq, TRes>;
