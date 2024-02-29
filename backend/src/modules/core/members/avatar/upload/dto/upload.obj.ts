import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UploadCoreFilesObj } from "@/modules/core/files/upload/dto/upload.obj";

@ObjectType()
export class UploadAvatarCoreMembersObj extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;
}
