import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base/base.entity';
import { UserEntity } from '../user/user.entity';
import { PermissionEntity } from '../permission/entities/permission.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.role)
  permissions: PermissionEntity[];
}
