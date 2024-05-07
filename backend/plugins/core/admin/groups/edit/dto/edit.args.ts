import { ArgsType, Field, Int } from "@nestjs/graphql";

import { CreateAdminGroupsArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditAdminGroupsArgs extends CreateAdminGroupsArgs {
  @Field(() => Int)
  id: number;
}
