import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // eslint-disable-next-line class-methods-use-this
  @Get('/status')
  status() {
    return { status: 'ok' };
  }
}
