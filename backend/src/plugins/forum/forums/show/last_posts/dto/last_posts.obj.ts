import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import { TextLanguage } from "@/utils/types/database/text-language.type";
import { PageInfo } from "@/utils/types/database/pagination.type";

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

  @Field(() => Date)
  created: Date;

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
