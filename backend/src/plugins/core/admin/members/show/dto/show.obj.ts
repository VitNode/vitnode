import { Field, ObjectType } from "@nestjs/graphql";

import { ShowCoreMembers } from "@/plugins/core/members/show/dto/show.obj";
import { PageInfo } from "@/utils/types/database/pagination.type";

@ObjectType()
export class ShowAdminMembersObj {
  @Field(() => [ShowAdminMembers])
  edges: ShowAdminMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminMembers extends ShowCoreMembers {
  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;
}
