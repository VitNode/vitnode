import { PageInfo } from '@/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminPlugins {
  @Field(() => Boolean)
  allow_default: boolean;

  @Field(() => String)
  author: string;

  @Field(() => String, { nullable: true })
  author_url: null | string;

  @Field(() => String)
  code: string;

  @Field(() => Date)
  created: Date;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => String, { nullable: true })
  description: null | string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  support_url: string;

  @Field(() => Date)
  updated: Date;

  @Field(() => String)
  version: string;

  @Field(() => Int)
  version_code: number;
}

@ObjectType()
export class ShowAdminPluginsObj {
  @Field(() => [ShowAdminPlugins])
  edges: ShowAdminPlugins[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
