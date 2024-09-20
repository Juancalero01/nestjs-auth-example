import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base/base.entity';
import { RoleEntity } from '../role/role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: false })
  role: RoleEntity;
}
