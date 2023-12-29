import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class ShowPostsForumsMetaTags {
  @Field(() => String)
  id: string;

  @Field(() => String)
  action: string;

  @Field(() => User)
  member: User;
}

@ObjectType()
export class ShowPostsForums {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => User)
  author: User;
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
