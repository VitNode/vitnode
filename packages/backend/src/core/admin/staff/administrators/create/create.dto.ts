import { ArgsType, Field, Int } from '@nestjs/graphql';

import { PermissionsStaffArgs } from '../permissions/input.dto';

@ArgsType()
export class CreateAdminStaffAdministratorsArgs {
  @Field(() => Int, { nullable: true })
  group_id: null | number;

  @Field(() => [PermissionsStaffArgs], { nullable: true })
  permissions: PermissionsStaffArgs[];

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Int, { nullable: true })
  user_id: null | number;
}
