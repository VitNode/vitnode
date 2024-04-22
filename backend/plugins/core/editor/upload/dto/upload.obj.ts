import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UploadCoreFilesObj } from "@/plugins/core/files/upload/dto/upload.obj";

@ObjectType()
export class UploadCoreEditorObj extends UploadCoreFilesObj {
  @Field(() => Int)
  user_id: number;
}
