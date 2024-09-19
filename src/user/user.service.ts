import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/shared/base/base.service';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user)
        throw new NotFoundException(`User with username ${username} not found`);
      return user;
    } catch (error) {
      throw new BadRequestException('Error fetching user', error.message);
    }
  }
}
