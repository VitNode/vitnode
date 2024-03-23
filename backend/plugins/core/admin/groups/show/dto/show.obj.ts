import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";

@ObjectType()
export class ShowAdminGroupsObj {
  @Field(() => [ShowAdminGroups])
  edges: ShowAdminGroups[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminGroups {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => Int)
  users_count: number;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  updated: Date;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Boolean)
  root: boolean;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  guest: boolean;
}
