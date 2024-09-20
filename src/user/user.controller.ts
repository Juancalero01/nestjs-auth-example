import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/base/base.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
