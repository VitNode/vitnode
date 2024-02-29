import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/src/types/database/pagination.type";

@ObjectType()
export class ShowCoreThemes {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  default: boolean;
}

@ObjectType()
export class ShowCoreThemesObj {
  @Field(() => [ShowCoreThemes])
  edges: ShowCoreThemes[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
