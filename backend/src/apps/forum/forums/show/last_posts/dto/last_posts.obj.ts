import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";
import { User } from "@/utils/decorators/user.decorator";

@ObjectType()
export class TopicLastPostsShowForumForums {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  title: TextLanguage[];
}

@ObjectType()
export class LastPostsShowForumForums {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  created: number;

  @Field(() => User)
  user: User;

  @Field(() => TopicLastPostsShowForumForums)
  topic: TopicLastPostsShowForumForums;
}

@ObjectType()
export class LastPostsShowForumForumsObj {
  @Field(() => [LastPostsShowForumForums])
  edges: LastPostsShowForumForums[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
