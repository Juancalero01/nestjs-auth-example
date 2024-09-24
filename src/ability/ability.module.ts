import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { AbilityFactory } from './ability.factory';

@Module({
  imports: [RoleModule],
  providers: [AbilityFactory],
  exports: [AbilityFactory],
})
export class AbilityModule {}
