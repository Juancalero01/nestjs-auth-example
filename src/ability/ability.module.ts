import { Module } from '@nestjs/common';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [RoleModule],
})
export class AbilityModule {}
