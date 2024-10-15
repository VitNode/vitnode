import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

@InputType()
class PermissionsStaffInput {
  @Field(() => [String])
  children: string[];

  @Field(() => String)
  id: string;
}

@InputType()
export class PermissionsStaffArgs {
  @Field(() => [PermissionsStaffInput])
  permissions: PermissionsStaffInput[];

  @Field(() => String)
  plugin_code: string;
}

@ObjectType()
export class PermissionsStaff {
  @Field(() => [String])
  children: string[];

  @Field(() => String)
  id: string;
}

@ObjectType()
export class PermissionsStaffObj {
  @Field(() => [PermissionsStaff])
  permissions: PermissionsStaff[];

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
