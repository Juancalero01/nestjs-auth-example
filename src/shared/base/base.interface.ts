export interface BaseInterface<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T>;
}
