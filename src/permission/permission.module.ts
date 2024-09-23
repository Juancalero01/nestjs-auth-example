import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { ActionEntity } from './entities/action.entity';
import { SubjectEntity } from './entities/subject.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, ActionEntity, SubjectEntity]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
