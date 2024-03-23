import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteAdminGroupsArgs {
  @Field(() => Int)
  id: number;
}
