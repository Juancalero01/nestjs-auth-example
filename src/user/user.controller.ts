import { Controller } from '@nestjs/common';
import { BaseController } from 'src/shared/base/base.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
