import { ArgsType, Field, Int } from '@nestjs/graphql';

import { PermissionsStaffArgs } from '../permissions/dto';

@ArgsType()
export class CreateEditAdminStaffAdministratorsArgs {
  @Field(() => Int, { nullable: true })
  group_id: null | number;

  @Field(() => [PermissionsStaffArgs], { nullable: true })
  permissions: PermissionsStaffArgs[];

  @Field(() => Int, { nullable: true })
  user_id: null | number;
}
