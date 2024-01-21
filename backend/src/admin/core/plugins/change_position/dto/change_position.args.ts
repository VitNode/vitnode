import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ChangePositionAdminPluginsArgs {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  index_to_move: number;
}
