import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
export class ShowAdminPlugins {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  version: string | null;

  @Field(() => Int, { nullable: true })
  version_code: number | null;

  @Field(() => Boolean)
  enabled: boolean;

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
export class ShowAdminPluginsObj {
  @Field(() => [ShowAdminPlugins])
  edges: ShowAdminPlugins[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
