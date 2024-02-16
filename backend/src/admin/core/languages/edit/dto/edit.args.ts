import { ArgsType, Field, Int } from "@nestjs/graphql";

import { CreateCoreAdminLanguagesArgs } from "../../create/dto/edit.args";

@ArgsType()
export class EditCoreAdminLanguagesArgs extends CreateCoreAdminLanguagesArgs {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  default: boolean;
}
