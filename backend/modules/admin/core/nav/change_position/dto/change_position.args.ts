import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class ChangePositionAdminNavArgs {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  index_to_move: number;

  @Field(() => Int, { nullable: true })
  parent_id: number | null;
}
