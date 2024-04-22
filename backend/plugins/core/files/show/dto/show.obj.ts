import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
class ShowCoreFiles {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class ShowCoreFilesObj {
  @Field(() => [ShowCoreFiles])
  edges: ShowCoreFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
