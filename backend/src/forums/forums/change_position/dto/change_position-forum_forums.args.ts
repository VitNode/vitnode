import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ChangePositionForumForumsArgs {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  index_to_move: number;

  @Field(() => String, { nullable: true })
  parent_id: string | null;
}
