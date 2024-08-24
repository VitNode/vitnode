import { ShowCoreFiles } from '@/core/files/show/dto/show.obj';
import { User } from '@/decorators';
import { PageInfo } from '@/utils';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminFiles extends ShowCoreFiles {
  @Field(() => User, { nullable: true })
  user: null | User;
}

@ObjectType()
export class ShowAdminFilesObj {
  @Field(() => [ShowAdminFiles])
  edges: ShowAdminFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
