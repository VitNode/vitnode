import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo, TextLanguage } from 'vitnode-backend';

@ObjectType()
export class ShowBlogCategories {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => [TextLanguage], { nullable: true })
  description: TextLanguage[] | null;

  @Field(() => Int)
  position: number;

  @Field(() => String)
  color: string;
}

@ObjectType()
export class ShowBlogCategoriesObj {
  @Field(() => [ShowBlogCategories])
  edges: ShowBlogCategories[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
