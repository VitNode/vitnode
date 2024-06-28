import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/utils';
import { ShowCoreMembers } from '../../../../members/show/dto/show.obj';

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
