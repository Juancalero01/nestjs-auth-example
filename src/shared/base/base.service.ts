import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class BaseService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(options?: any): Promise<T[]> {
    try {
      const entities = await this.repository.find(options);
      if (!entities.length) throw new NotFoundException('No entities found');
      return entities;
    } catch (error) {
      throw new BadRequestException('Error fetching data', error.message);
    }
  }

  async findOne(id: number): Promise<T> {
    try {
      const entity = await this.repository.findOne({ where: { id } as any });
      if (!entity)
        throw new NotFoundException(`Entity with ID ${id} not found`);
      return entity;
    } catch (error) {
      throw new BadRequestException('Error fetching entity', error.message);
    }
  }

  async create(entity: T): Promise<T> {
    try {
      return await this.repository.save(entity);
    } catch (error) {
      throw new BadRequestException('Error creating entity', error.message);
    }
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    try {
      const existingEntity = await this.findOne(id);
      const updatedEntity = Object.assign(existingEntity, entity);
      return await this.repository.save(updatedEntity);
    } catch (error) {
      throw new BadRequestException('Error updating entity', error.message);
    }
  }
}
