import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/base';
import { UserService, UserEntity } from '.';

@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
