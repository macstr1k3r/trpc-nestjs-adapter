import { Injectable } from '@nestjs/common';

@Injectable()
export class AService {
  smth() {
    return {
      a: true,
    };
  }
}
