import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/pagination.type';

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
