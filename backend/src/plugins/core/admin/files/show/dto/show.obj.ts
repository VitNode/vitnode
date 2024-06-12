import { Field, ObjectType } from "@nestjs/graphql";
import { PageInfo, User } from "@vitnode/backend";

import { ShowCoreFiles } from "@/plugins/core/files/show/dto/show.obj";

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
