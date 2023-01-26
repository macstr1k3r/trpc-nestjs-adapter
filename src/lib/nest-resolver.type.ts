import type { ModuleRef } from '@nestjs/core';

export interface NestResolver {
  /**
   * Resolves any NestJS dependency from your project.
   * 
   * Return type of this function is automatically inferred.
   * 
   * Returns a promise which resolves to the dependency.
   */
  resolveNestDependency: ModuleRef['resolve'];
}
