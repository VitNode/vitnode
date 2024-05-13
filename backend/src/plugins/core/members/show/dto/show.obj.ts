import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import { PageInfo } from "@/utils/types/database/pagination.type";
import { TextLanguage } from "@/utils/types/database/text-language.type";

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
  @Field(() => Date)
  joined: Date;

  @Field(() => Int)
  posts: number;
}
