import { ArgsType, Field, Int } from "@nestjs/graphql";

import { CreateForumForumsArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditForumForumsArgs extends CreateForumForumsArgs {
  @Field(() => Int)
  id: number;
}
