import { Injectable } from '@nestjs/common';
import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { RoleService } from 'src/role/role.service';
import { AppAbility } from './ability.type';

@Injectable()
export class AbilityFactory {
  constructor(private roleService: RoleService) {}

  async createForUser(user: any) {
    const { can, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    const role = await this.roleService.findOneByUser(user.sub);

    if (role.name === 'superadmin') {
      can('manage', 'all');
    } else {
      role.permissions.forEach((permission) => {
        const action = permission.action.name;
        const subject = permission.subject.name;
        const isAllowed = permission.isAllowed;

        if (action && subject && isAllowed) {
          can(action, subject);
        }
      });
    }

    return build({
      detectSubjectType: (item: any) => item.constructor.name,
    });
  }
}
