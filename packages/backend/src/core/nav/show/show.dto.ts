import { PageInfo, PaginationArgs, StringLanguage } from '@/utils';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreNavArgs extends PaginationArgs {}

@ObjectType()
class ShowCoreNavItem {
  @Field(() => [StringLanguage])
  description: StringLanguage[];

  @Field(() => Boolean)
  external: boolean;

  @Field(() => String)
  href: string;

  @Field(() => String, { nullable: true })
  icon: null | string;

  @Field(() => Int)
  id: number;

  @Field(() => [StringLanguage])
  name: StringLanguage[];

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
