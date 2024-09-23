import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/base/base.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';

@Controller('role')
export class RoleController extends BaseController<RoleEntity> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
