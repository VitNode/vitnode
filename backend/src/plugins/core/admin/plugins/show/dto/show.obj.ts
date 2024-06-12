import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PageInfo } from "@vitnode/backend";

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

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  updated: Date;

  @Field(() => String)
  support_url: string;

  @Field(() => String)
  author: string;

  @Field(() => String, { nullable: true })
  author_url: string | null;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  allow_default: boolean;
}

@ObjectType()
export class ShowAdminPluginsObj {
  @Field(() => [ShowAdminPlugins])
  edges: ShowAdminPlugins[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
