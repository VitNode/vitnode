import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeletePostsForumsArgs {

  @Field(() => Int)
  post_id: number;
}
