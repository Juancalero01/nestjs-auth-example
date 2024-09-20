import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { ActionEntity } from './entities/action.entity';
import { SubjectEntity } from './entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, ActionEntity, SubjectEntity]),
  ],
})
export class PermissionModule {}
