import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RequestScopedService {
  @Inject(REQUEST)
  private readonly req: any;

  doesSomething() {
    return {
      done: true,
      isRequestScoped: true,
      hostHeader: this.req.headers.host,
    };
  }
}
