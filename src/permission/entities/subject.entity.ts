import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/base/base.entity';
import { PermissionEntity } from './permission.entity';

@Entity('subjects')
export class SubjectEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => PermissionEntity, (permission) => permission.subject)
  permissions: PermissionEntity[];
}
