import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

@ObjectType()
class ShowCoreNavItem {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => [TextLanguage])
  description: TextLanguage[];

  @Field(() => String)
  href: string;

  @Field(() => Int)
  position: number;
}

@ObjectType()
export class ShowCoreNav extends ShowCoreNavItem {
  @Field(() => [ShowCoreNavItem])
  children: ShowCoreNavItem[];
}

@ObjectType()
export class ShowCoreNavObj {
  @Field(() => [ShowCoreNav])
  edges: ShowCoreNav[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
