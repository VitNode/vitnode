import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowForumCategoriesArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  search?: string;
}
