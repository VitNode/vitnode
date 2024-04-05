import {
  Field,
  Int,
  ObjectType,
  createUnionType,
  registerEnumType
} from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";
import { User } from "@/utils/decorators/user.decorator";

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

export const PostsWithMetaTagsUnion = createUnionType({
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
