import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class ShowTopicsForumsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  forum_id: number | null;

  @Field(() => Int, { nullable: true })
  id: number | null;
}
