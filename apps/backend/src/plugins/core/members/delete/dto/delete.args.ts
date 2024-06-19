import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteCoreMembersArgs {
  @Field(() => Int)
  id: number;
}
