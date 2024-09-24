import { Controller, Get } from '@nestjs/common';
import { Public } from '../utils/decorators/public.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get('/')
  run() {
    return { status: 'ok' };
  }
}
