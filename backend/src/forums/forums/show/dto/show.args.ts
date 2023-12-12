import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowForumForumsArgs {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => String, { nullable: true })
  parent_id: string | null;

  @Field(() => String, { nullable: true })
  name_seo: string | null;
}
