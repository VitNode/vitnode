import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";

@ObjectType()
export class ShowBlogCategories {
  @Field(() => Int)
  id: number;

  @Field(() => TextLanguage)
  name: TextLanguage;

  @Field(() => TextLanguage, { nullable: true })
  description: TextLanguage | null;
}

@ObjectType()
export class ShowBlogCategoriesObj {
  @Field(() => [ShowBlogCategories])
  edges: ShowBlogCategories[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
