import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CheckPolicies } from '../policy/policies.decorator';
import { AppAbility } from '../ability/ability.type';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @CheckPolicies((ability: AppAbility) => ability.can('read', 'User'))
  async findAll(): Promise<any[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  @CheckPolicies((ability: AppAbility) => ability.can('read', 'User'))
  async findOne(@Param('id') id: number): Promise<any> {
    try {
      const entity = await this.userService.findOne(id);
      if (!entity) {
        throw new HttpException(
          `Entity with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return entity;
    } catch (error) {
      throw new HttpException(
        'Error fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/')
  @CheckPolicies((ability: AppAbility) => ability.can('create', 'User'))
  async create(@Body() entity: any): Promise<any> {
    try {
      return await this.userService.create(entity);
    } catch (error) {
      throw new HttpException(
        'Error creating entity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  @CheckPolicies((ability: AppAbility) => ability.can('update', 'User'))
  async update(@Param('id') id: number, @Body() entity: any): Promise<any> {
    try {
      const existingEntity = await this.userService.findOne(id);
      if (!existingEntity) {
        throw new HttpException(
          `Entity with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.userService.update(id, entity);
    } catch (error) {
      throw new HttpException(
        'Error updating entity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
