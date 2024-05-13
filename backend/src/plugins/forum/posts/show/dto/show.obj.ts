import {
  Field,
  Int,
  ObjectType,
  createUnionType,
  registerEnumType
} from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import { TextLanguage } from "@/utils/types/database/text-language.type";

export enum TopicActions {
  lock = "lock",
  unlock = "unlock"
}

registerEnumType(TopicActions, {
  name: "TopicActions"
});

@ObjectType()
export class ShowPostsForumsMetaTags {
  @Field(() => Int)
  action_id: number;

  @Field(() => TopicActions)
  action: string;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  created: Date;
}

@ObjectType()
export class ShowPostsForums {
  @Field(() => Int)
  post_id: number;

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => User)
  user: User;

  @Field(() => Date)
  created: Date;
}

const PostsWithMetaTagsUnion = createUnionType({
  name: "postsWithMetaTagsUnion",
  types: () => [ShowPostsForums, ShowPostsForumsMetaTags] as const,
  resolveType(value) {
    if (value.action) {
      return ShowPostsForumsMetaTags;
    }

    if (value.content) {
      return ShowPostsForums;
    }

    return null;
  }
});

@ObjectType()
class PageInfoShowPostsForums {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPostsCount: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class ShowPostsForumsObj {
  @Field(() => [PostsWithMetaTagsUnion])
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];

  @Field(() => [PostsWithMetaTagsUnion])
  lastEdges: (ShowPostsForums | ShowPostsForumsMetaTags)[];

  @Field(() => PageInfoShowPostsForums)
  pageInfo: PageInfoShowPostsForums;
}
