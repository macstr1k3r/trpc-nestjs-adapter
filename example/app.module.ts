import { Module } from '@nestjs/common';
import { TrpcModule } from '../lib/trpc.module';
import { AModule } from './domain-b/a.module';
import { appRouter } from './init-trpc';

@Module({
  imports: [
    AModule,
    TrpcModule.forRoot({
      path: '/trpc',
      router: appRouter,
      createContext: () => ({}),
    }),
  ],
})
export class AppModule { }
