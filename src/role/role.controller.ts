import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/base/base.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController extends BaseController<RoleEntity> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
