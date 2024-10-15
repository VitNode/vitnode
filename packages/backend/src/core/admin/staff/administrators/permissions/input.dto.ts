import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PermissionsStaff {
  @Field(() => [String])
  children: string[];

  @Field(() => String)
  id: string;
}

@InputType()
export class PermissionsStaffArgs {
  @Field(() => [PermissionsStaff])
  permissions: PermissionsStaff[];

  @Field(() => String)
  plugin_code: string;
}
