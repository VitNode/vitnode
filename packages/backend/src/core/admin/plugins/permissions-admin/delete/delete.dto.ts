import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminPermissionsAdminPluginsArgs {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  parent_id?: string;

  @Field(() => String)
  plugin_code: string;
}
