import {
  DynamicModule, Inject, Module, OnModuleInit,
} from '@nestjs/common';
import { HttpAdapterHost, ModuleRef } from '@nestjs/core';
import { attachTrpcToExpressApp } from './attach-trpc-to-express-app';
import { TRPC_CREATE_CONTEXT_TOKEN, TRPC_PATH_TOKEN, TRPC_ROUTER_TOKEN } from './tokens';
import { TrpcModuleOptions } from './trpc-module-options.type';

@Module({})
export class TrpcModule implements OnModuleInit {
  @Inject()
  private readonly moduleRef!: ModuleRef;

  @Inject()
  private readonly httpAdapterHost!: HttpAdapterHost;

  @Inject(TRPC_ROUTER_TOKEN)
  private readonly router!: TrpcModuleOptions['router'];

  @Inject(TRPC_PATH_TOKEN)
  private readonly path!: TrpcModuleOptions['path'];

  @Inject(TRPC_CREATE_CONTEXT_TOKEN)
  private readonly createContext!: TrpcModuleOptions['createContext'];

  static forRoot(options: TrpcModuleOptions): DynamicModule {
    if (!options.createContext || !options.path || !options.router) {
      throw new Error('Please supply all of the required options to TrpcModule');
    }

    return {
      module: TrpcModule,
      providers: [
        { provide: TRPC_ROUTER_TOKEN, useValue: options.router },
        { provide: TRPC_PATH_TOKEN, useValue: options.path },
        { provide: TRPC_CREATE_CONTEXT_TOKEN, useValue: options.createContext },
      ],
    };
  }

  onModuleInit() {
    attachTrpcToExpressApp({
      moduleRef: this.moduleRef,
      expressApp: this.httpAdapterHost.httpAdapter.getInstance(),
      path: this.path,
      createContext: this.createContext,
      router: this.router,
    });
  }
}
