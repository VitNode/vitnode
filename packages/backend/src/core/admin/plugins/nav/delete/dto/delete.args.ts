import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteCreateAdminNavPluginsArgs {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  parent_code?: string;

  @Field(() => String)
  plugin_code: string;
}
