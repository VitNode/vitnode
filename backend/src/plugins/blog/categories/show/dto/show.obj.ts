import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/utils/types/database/pagination.type";
import { TextLanguage } from "@/utils/types/database/text-language.type";

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
