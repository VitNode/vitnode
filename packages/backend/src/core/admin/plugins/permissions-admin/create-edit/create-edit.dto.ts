import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateEditAdminPermissionsAdminPluginsArgs {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  old_id?: string;

  @Field(() => String, { nullable: true })
  parent_id?: string;

  @Field(() => String)
  plugin_code: string;
}
