import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';

@ObjectType()
export class ShowCorePlugins {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  default: boolean;
}

@ObjectType()
export class ShowCorePluginsObj {
  @Field(() => [ShowCorePlugins])
  edges: ShowCorePlugins[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
