import { ArgsType, Field, Int, OmitType } from "@nestjs/graphql";

import { CreateForumTopicsArgs } from "../../create/dto/create.args";

@ArgsType()
export class EditForumTopicsArgs extends OmitType(CreateForumTopicsArgs, [
  "forum_id"
] as const) {
  @Field(() => Int)
  id: number;
}
