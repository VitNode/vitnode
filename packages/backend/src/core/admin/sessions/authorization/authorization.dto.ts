import { UserWithDangerousInfo } from '@/decorators';
import { Field, ObjectType } from '@nestjs/graphql';

import { PermissionsStaffObjWithoutPluginName } from '../../staff/administrators/permissions/dto';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => [PermissionsStaffObjWithoutPluginName])
  permissions: PermissionsStaffObjWithoutPluginName[];

  @Field(() => Boolean)
  restart_server: boolean;

  @Field(() => UserWithDangerousInfo)
  user: UserWithDangerousInfo;

  @Field(() => String)
  version: string;
}
