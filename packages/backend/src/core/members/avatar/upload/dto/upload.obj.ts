import { UploadCoreFilesObj } from '@/core/files/helpers/upload/dto/upload.obj';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadAvatarCoreMembersObj extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;
}
