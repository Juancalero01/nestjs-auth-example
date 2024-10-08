import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { AppController } from './app.controller';
import { DatabaseConfig } from './config/database.config';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { PoliciesGuard } from './policy/policies.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    TerminusModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AbilityModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    JwtService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
})
export class AppModule {}
