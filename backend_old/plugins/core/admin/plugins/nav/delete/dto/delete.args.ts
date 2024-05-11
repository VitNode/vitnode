import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteCreateAdminNavPluginsArgs {
  @Field(() => Int)
  id: number;
}
