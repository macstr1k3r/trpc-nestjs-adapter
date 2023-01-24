import type { ModuleRef } from '@nestjs/core';

export interface NestResolver {
  resolveNestDependency: ModuleRef['resolve'];
}
