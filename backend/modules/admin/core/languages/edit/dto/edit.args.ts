import { ArgsType, Field, Int, OmitType } from "@nestjs/graphql";

import { CreateCoreAdminLanguagesArgs } from "../../create/dto/edit.args";

@ArgsType()
export class EditCoreAdminLanguagesArgs extends OmitType(
  CreateCoreAdminLanguagesArgs,
  ["code"] as const
) {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  default: boolean;
}
