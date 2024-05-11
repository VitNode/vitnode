import { ArgsType, Field, Int } from "@nestjs/graphql";

import { CreateAdminThemesArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditAdminThemesArgs extends CreateAdminThemesArgs {
  @Field(() => Int)
  id: number;
}
