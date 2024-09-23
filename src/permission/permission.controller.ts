import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/base/base.controller';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './entities/permission.entity';

@Controller('permission')
export class PermissionController extends BaseController<PermissionEntity> {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService);
  }
}
