import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base/base.service';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService extends BaseService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {
    super(permissionRepository);
  }
}
