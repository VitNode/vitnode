import { ShowCoreFiles, ShowCoreFilesArgs } from '@/core/files/show/show.dto';
import { User } from '@/decorators';
import { PageInfo } from '@/utils';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class ShowAdminFilesArgs extends ShowCoreFilesArgs {}

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
