import { Field, ObjectType } from '@nestjs/graphql';

import { ShowCoreFiles } from '../../../../files/show/dto/show.obj';
import { User } from '@/decorators';
import { PageInfo } from '@/utils';

@ObjectType()
export class ShowAdminFiles extends ShowCoreFiles {
  @Field(() => User)
  user: User;
}

@ObjectType()
export class ShowAdminFilesObj {
  @Field(() => [ShowAdminFiles])
  edges: ShowAdminFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
