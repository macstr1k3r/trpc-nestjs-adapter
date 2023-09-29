import { AnyRouter } from "@trpc/server";

export interface TrpcModuleOptions<TRouter = AnyRouter> {
    path: "/trpc" | string;
    router: TRouter;
    createContext: () => any;
}
