import { ArgsType, Field, OmitType } from "@nestjs/graphql";

import { CreateAdminPluginsArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditAdminPluginsArgs extends OmitType(CreateAdminPluginsArgs, [
  "code"
] as const) {
  @Field(() => String)
  code: string;

  @Field(() => Boolean, { nullable: true })
  default: boolean | null;

  @Field(() => Boolean, { nullable: true })
  active: boolean | null;
}
