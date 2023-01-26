# tRPC - Nest.JS Adapter

- Allows you to use Trpc with Nest.JS.
- Allows you to use request scoped Nest.JS providers
- Allows you to use Nest.JS's great module system


## Feature support
I don't use all of the features tRPC has :/ 

Both __queries__ and __mutations__ work. 

I __haven't__ tested subscriptions yet.

## How

See the `example` folder in this repo, but briefly 

```bash
yarn add trpc-nestjs-adapter
```

`main.ts`
``` ts 
// Standard  nest.js main.ts
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}

bootstrap();
```

`app.module.ts`
```ts
import { Module } from '@nestjs/common';
import { TrpcModule } from 'trpc-nestjs-adapter';
import { rootRouter } from './trpc/root-trpc.router.ts';
import { createContext }  from './trpc/create-context.ts';

@Module({
  imports: [
    AModule,
    TrpcModule.forRoot({
      path: '/trpc',
      router: rootRouter,
      createContext,
    }),
  ],
})
export class AppModule { }

```


### Inside of your procedures

```ts
export const exampleMutation = trpc.procedure
    .input()
    .mutation(async ({ ctx })=>{
        const nestService = await ctx.resolveNestDependency(SomeNestService);

        await nestService.someServiceMethod()
    })
```


#### Note
The package is marked `alpha` for a reason, but mostly It's not documented very well.

If/When/As the package gains traction I'll improve the example & related docs.