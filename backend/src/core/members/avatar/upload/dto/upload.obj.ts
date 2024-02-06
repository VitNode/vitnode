import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UploadCoreFilesObj } from "@/src/core/files/upload/dto/upload.obj";

@ObjectType()
export class UploadAvatarCoreMembersObj extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;
}
