import { PageInfo, PaginationArgs, TextLanguage } from '@/utils';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreTermsArgs extends PaginationArgs {}

@ObjectType()
export class ShowCoreTerms {
  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => Date)
  created: Date;

  @Field(() => String, { nullable: true })
  href: null | string;

  @Field(() => Number)
  id: number;

  @Field(() => [TextLanguage])
  title: TextLanguage[];

  @Field(() => Date)
  updated: Date;
}

@ObjectType()
export class ShowCoreTermsObj {
  @Field(() => [ShowCoreTerms])
  edges: ShowCoreTerms[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
