import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@/decorators';
import { PageInfo } from '@/utils';
import { ShowCoreFiles } from '@/core/files/show/dto/show.obj';

@ObjectType()
export class ShowAdminFiles extends ShowCoreFiles {
  @Field(() => User, { nullable: true })
  user: User | null;
}

@ObjectType()
export class ShowAdminFilesObj {
  @Field(() => [ShowAdminFiles])
  edges: ShowAdminFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
