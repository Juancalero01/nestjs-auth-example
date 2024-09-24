import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../shared/base/base.service';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }

  async findOneByUser(userId: number): Promise<RoleEntity> {
    try {
      const role = await this.roleRepository.findOne({
        relations: ['permissions', 'permissions.action', 'permissions.subject'],
        select: {
          id: true,
          name: true,
          permissions: {
            id: true,
            action: {
              id: true,
              name: true,
            },
            subject: {
              id: true,
              name: true,
            },
            isAllowed: true,
          },
        },
        where: {
          users: {
            id: userId,
          },
        },
      });
      if (!role)
        throw new NotFoundException(`Role with userId ${userId} not found`);
      return role;
    } catch (error) {
      throw new BadRequestException('Error fetching role', error.message);
    }
  }
}
