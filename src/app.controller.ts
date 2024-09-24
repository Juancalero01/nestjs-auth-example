import { Controller, Get } from '@nestjs/common';
import { Public } from './utils/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('/')
  run() {
    return {
      status: 'running',
    };
  }
}
