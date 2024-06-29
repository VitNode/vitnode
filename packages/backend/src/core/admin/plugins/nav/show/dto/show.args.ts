import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ShowAdminNavPluginsArgs {
  @Field(() => String)
  plugin_code: string;
}
