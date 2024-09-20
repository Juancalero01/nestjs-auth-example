import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base/base.service';
import { Repository } from 'typeorm';
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
        select: {
          id: true,
          name: true,
          permissions: {
            action: {
              name: true,
            },
            subject: {
              name: true,
            },
          },
        },
        relations: ['permissions', 'permissions.action', 'permissions.subject'],
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
