import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteAdminThemesArgs {
  @Field(() => Int)
  id: number;
}
