import { Injectable } from '@nestjs/common';
import { AbilityBuilder, AbilityClass, Ability } from '@casl/ability';
import { RoleService } from 'src/role/role.service';
import { AppAbility } from './ability.type';

@Injectable()
export class AbilityFactory {
  constructor(private roleService: RoleService) {}

  async createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    const role = await this.roleService.findOneByUser(user.sub);

    if (role.name === 'admin') {
      can('manage', 'all');
    } else {
      role.permissions.forEach((permission) => {
        const action = permission.action.name;
        const subject = permission.subject.name;

        if (action && subject) {
          can(action, subject);
        }
      });
    }

    return build({
      detectSubjectType: (item: any) => item.constructor.name,
    });
  }
}
