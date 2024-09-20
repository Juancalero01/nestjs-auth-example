import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base/base.entity';
import { RoleEntity } from '../../role/role.entity';
import { ActionEntity } from './action.entity';
import { SubjectEntity } from './subject.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  role: RoleEntity;

  @ManyToOne(() => ActionEntity, (action) => action.permissions)
  action: ActionEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.permissions)
  subject: SubjectEntity;
}
