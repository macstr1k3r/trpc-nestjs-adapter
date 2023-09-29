"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const init_trpc_1 = require("./init-trpc");
const request_scoped_service_1 = require("./request-scoped.service");
const trpc_module_1 = require("../lib/trpc.module");
const a_module_1 = require("../example/domain-b/a.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [
            request_scoped_service_1.RequestScopedService,
        ],
        imports: [
            a_module_1.AModule,
            trpc_module_1.TrpcModule.forRoot({
                path: '/trpc',
                router: init_trpc_1.appRouter,
                createContext: () => {
                    'randomValue';
                },
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map