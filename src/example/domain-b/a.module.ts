import { Module } from '@nestjs/common';

import { AService } from './a.service';

@Module({
  providers: [
    AService,
  ],
})
export class AModule { }
