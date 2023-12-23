import { ObjectType, OmitType } from '@nestjs/graphql';

import { ShowForumForumsWithParent } from '../../../../../forums/forums/show/dto/show.obj';

@ObjectType()
export class CreateForumForumsObj extends OmitType(ShowForumForumsWithParent, [
  'permissions'
] as const) {}
