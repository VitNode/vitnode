import { ArgsType, Field, Int, OmitType } from "@nestjs/graphql";

import { CreateAdminNavPluginsArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditCreateAdminNavPluginsArgs extends OmitType(
  CreateAdminNavPluginsArgs,
  ["plugin_code"] as const
) {
  @Field(() => Int)
  id: number;
}
