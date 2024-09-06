import { PageInfo, PaginationArgs, StringLanguage } from '@/utils';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class ShowCoreTermsArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  code?: string;
}

@ObjectType()
export class ShowCoreTerms {
  @Field(() => String)
  code: string;

  @Field(() => [StringLanguage])
  content: StringLanguage[];

  @Field(() => Date)
  created: Date;

  @Field(() => String, { nullable: true })
  href: null | string;

  @Field(() => Number)
  id: number;

  @Field(() => [StringLanguage])
  title: StringLanguage[];

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
