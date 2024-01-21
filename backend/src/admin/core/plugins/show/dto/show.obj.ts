import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';

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

  @Field(() => String)
  version: string;

  @Field(() => Int)
  version_code: number;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  uploaded: number;

  @Field(() => Int)
  updated: number;

  @Field(() => String, { nullable: true })
  support: string | null;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => String)
  author: string;

  @Field(() => String)
  author_url: string;

  @Field(() => Int)
  position: number;

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
