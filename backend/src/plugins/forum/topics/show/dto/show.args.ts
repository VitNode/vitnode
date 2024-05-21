import { ArgsType, Field, Int } from "@nestjs/graphql";

import { PaginationArgs } from "@/utils/types/database/pagination.type";

@ArgsType()
export class ShowTopicsForumsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  forum_id: number | null;

  @Field(() => Int, { nullable: true })
  id: number | null;
}
