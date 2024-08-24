import { ShowCoreMembers } from '@/core/members/show/dto/show.obj';
import { PageInfo } from '@/utils';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminMembers extends ShowCoreMembers {
  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;
}

@ObjectType()
export class ShowAdminMembersObj {
  @Field(() => [ShowAdminMembers])
  edges: ShowAdminMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
