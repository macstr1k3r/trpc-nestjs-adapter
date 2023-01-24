import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { appRouter } from './init-trpc';
import { RequestScopedService } from './request-scoped.service';
import { TrpcModule } from '../lib/trpc.module';
import { AModule } from '../example/domain-b/a.module';

@Module({
  controllers: [AppController],
  providers: [
    RequestScopedService,
  ],
  imports: [
    AModule,
    TrpcModule.forRoot({
      path: '/trpc',
      router: appRouter,
      createContext: () => {
        'randomValue';
      },
    }),
  ],
})
export class AppModule { }
