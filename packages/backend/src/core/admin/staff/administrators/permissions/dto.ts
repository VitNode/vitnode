import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

@InputType()
class PermissionsStaffInput {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  permissions: string[];
}

@InputType()
export class PermissionsStaffArgs {
  @Field(() => [PermissionsStaffInput])
  groups: PermissionsStaffInput[];

  @Field(() => String)
  plugin_code: string;
}

@ObjectType()
export class PermissionsStaff {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  permissions: string[];
}

@ObjectType()
export class PermissionsStaffObj {
  @Field(() => [PermissionsStaff])
  groups: PermissionsStaff[];

  @Field(() => String)
  plugin: string;

  @Field(() => String)
  plugin_code: string;
}

@ObjectType()
export class PermissionsStaffObjWithoutPluginName extends OmitType(
  PermissionsStaffObj,
  ['plugin'] as const,
) {}
