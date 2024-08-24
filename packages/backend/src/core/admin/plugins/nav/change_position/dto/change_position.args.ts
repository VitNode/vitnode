import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ChangePositionAdminNavPluginsArgs {
  @Field(() => String)
  code: string;

  @Field(() => Int)
  index_to_move: number;

  @Field(() => String, { nullable: true })
  parent_code?: string;

  @Field(() => String)
  plugin_code: string;
}
