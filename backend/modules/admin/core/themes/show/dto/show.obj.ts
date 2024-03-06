import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
export class ShowAdminThemes {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  version: string | null;

  @Field(() => Int, { nullable: true })
  version_code: number | null;

  @Field(() => Int)
  created: number;

  @Field(() => String, { nullable: true })
  support_url: string | null;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => String)
  author: string;

  @Field(() => String)
  author_url: string;

  @Field(() => Boolean)
  default: boolean;
}

@ObjectType()
export class ShowAdminThemesObj {
  @Field(() => [ShowAdminThemes])
  edges: ShowAdminThemes[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
