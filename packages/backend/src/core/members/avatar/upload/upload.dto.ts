import { UploadCoreFilesObj } from '@/core/files/helpers/upload/upload.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadAvatarCoreMembersObj extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;
}
