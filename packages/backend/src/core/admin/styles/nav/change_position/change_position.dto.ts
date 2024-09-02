import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ChangePositionAdminNavStylesArgs {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  index_to_move: number;

  @Field(() => Int)
  parent_id: number;
}
