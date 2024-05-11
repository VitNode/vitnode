import { PageInfo } from "@/utils/types/database/pagination.type";
import { Field, Int, ObjectType } from "@nestjs/graphql";

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
