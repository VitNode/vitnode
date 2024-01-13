import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum ShowPostsForumsSortingEnum {
  oldest = 'oldest',
  newest = 'newest'
}

registerEnumType(ShowPostsForumsSortingEnum, {
  name: 'ShowPostsForumsSortingEnum'
});

@ArgsType()
export class ShowPostsForumsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => Int)
  topic_id: number;

  @Field(() => ShowPostsForumsSortingEnum, { nullable: true })
  sortBy: ShowPostsForumsSortingEnum | null;
}
