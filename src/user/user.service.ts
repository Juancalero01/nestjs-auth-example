import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base/base.service';
import { UserEntity } from './user.entity';
import { BcryptService } from './../utils/services/bcrypt.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private bcryptService: BcryptService,
  ) {
    super(userRepository);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        select: {
          id: true,
          username: true,
          password: true,
        },
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

  async create(body: any): Promise<UserEntity> {
    try {
      body.password = await this.bcryptService.hash(body.password);
      return await this.userRepository.save(body);
    } catch (error) {
      throw new BadRequestException('Error creating entity', error.message);
    }
  }
}
