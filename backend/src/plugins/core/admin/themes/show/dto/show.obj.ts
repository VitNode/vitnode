import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/utils/types/database/pagination.type";

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

  @Field(() => Date)
  created: Date;

  @Field(() => String)
  support_url: string;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => String)
  author: string;

  @Field(() => String, { nullable: true })
  author_url: string | null;

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
