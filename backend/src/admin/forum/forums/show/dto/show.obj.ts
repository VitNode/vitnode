import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { ShowForumForumsWithParent } from '../../../../../forum/forums/show/dto/show.obj';
import { PageInfo } from '@/types/database/pagination.type';

@ObjectType()
class ShowForumForumsAdmin extends OmitType(ShowForumForumsWithParent, ['permissions'] as const) {}

@ObjectType()
export class ShowForumForumsAdminObj {
  @Field(() => [ShowForumForumsAdmin])
  edges: ShowForumForumsAdmin[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
