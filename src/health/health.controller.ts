import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Public } from '../utils/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Public()
  @Get('/')
  @HealthCheck()
  async readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.db.pingCheck('database', { timeout: 300 }),
    ]);
  }
}
