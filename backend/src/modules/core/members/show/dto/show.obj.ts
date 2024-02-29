import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/src/types/database/pagination.type";
import { TextLanguage } from "@/src/types/database/text-language.type";
import { User } from "@/src/utils/decorators/user.decorator";

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => [ShowCoreMembers])
  edges: ShowCoreMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class GroupShowCoreMembers {
  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class ShowCoreMembers extends User {
  @Field(() => Int)
  joined: number;

  @Field(() => Int)
  posts: number;
}
