import { Field, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { ShowCoreFiles } from "@/plugins/core/files/show/dto/show.obj";
import { User } from "@/utils/decorators/user.decorator";

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
