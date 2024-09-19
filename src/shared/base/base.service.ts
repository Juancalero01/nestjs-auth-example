import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class BaseService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    return await this.repository.findOne({ where: { id } as any });
  }

  async create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async update(id: number, entity: T): Promise<T> {
    const existingEntity = await this.repository.findOne({
      where: { id } as any,
    });
    return await this.repository.save({ ...existingEntity, ...entity });
  }
}
