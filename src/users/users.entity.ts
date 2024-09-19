import { BaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;
}
