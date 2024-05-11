import { Field, ObjectType } from "@nestjs/graphql";

import { ShowCoreFiles } from "@/plugins/core/files/show/dto/show.obj";
import { User } from "@/utils/decorators/user.decorator";
import { PageInfo } from "@/utils/types/database/pagination.type";

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
