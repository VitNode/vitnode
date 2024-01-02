import { Field, Int, ObjectType, createUnionType, registerEnumType } from '@nestjs/graphql';
import { ForumTopicsActions } from '@prisma/client';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';
import { User } from '@/utils/decorators/user.decorator';

registerEnumType(ForumTopicsActions, {
  name: 'ForumTopicsActions'
});

@ObjectType()
export class ShowPostsForumsMetaTags {
  @Field(() => String)
  id: string;

  @Field(() => ForumTopicsActions)
  action: ForumTopicsActions;

  @Field(() => User)
  member: User;

  @Field(() => Int)
  created: number;
}

@ObjectType()
export class ShowPostsForums {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => User)
  author: User;

  @Field(() => Int)
  created: number;
}

const PostsWithMetaTagsUnion = createUnionType({
  name: 'postsWithMetaTagsUnion',
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
export class ShowPostsForumsObj {
  @Field(() => [PostsWithMetaTagsUnion])
  edges: (ShowPostsForums | ShowPostsForumsMetaTags)[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
