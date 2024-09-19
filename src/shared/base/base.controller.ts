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
import { BaseEntity, BaseInterface, BaseService } from '.';

@Controller()
export abstract class BaseController<T extends BaseEntity>
  implements BaseInterface<T>
{
  constructor(private readonly baseService: BaseService<T>) {}

  @Get('/')
  async findAll(): Promise<T[]> {
    try {
      return await this.baseService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<T> {
    try {
      const entity = await this.baseService.findOne(id);
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
  async create(@Body() entity: T): Promise<T> {
    try {
      return await this.baseService.create(entity);
    } catch (error) {
      throw new HttpException(
        'Error creating entity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() entity: T): Promise<T> {
    try {
      const existingEntity = await this.baseService.findOne(id);
      if (!existingEntity) {
        throw new HttpException(
          `Entity with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.baseService.update(id, entity);
    } catch (error) {
      throw new HttpException(
        'Error updating entity',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
